#!/usr/bin/env python
# coding: utf-8

# In[13]:


import numpy as np
import joblib
import re

from rdkit import Chem
from rdkit.Chem import AllChem, Descriptors, rdMolDescriptors,Lipinski

from explanationengine import generate_analysis_summary


# ============================================================
# LOAD MODEL
# ============================================================

import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "improved_model.pkl")
model = joblib.load(MODEL_PATH)

ECFP_BITS = 1024


# ============================================================
# EXCIPIENT CATEGORY MAP (FROZEN — MUST MATCH TRAINING)
# ============================================================

EXCIPIENT_CATEGORY_MAP = {
    "lactose": "reducing_sugar",
    "mannitol": "sugar_alcohol",
    "sorbitol": "sugar_alcohol",
    "hpmc": "polymer",
    "pvp": "polymer",
    "pvp k30": "polymer",
    "dcp": "inorganic_salt",
    "sodium bicarbonate": "inorganic_salt",
    "mcc": "filler",
    "microcrystalline cellulose": "filler",
    "magnesium stearate": "lubricant",
    "sodium starch glycolate": "disintegrant",
    "starch": "disintegrant"
}

EXCIPIENT_FLAG_ORDER = [
    "is_reducing_sugar",
    "is_sugar_alcohol",
    "is_polymer",
    "is_inorganic_salt",
    "is_filler",
    "is_lubricant",
    "is_disintegrant"
]

STRUCT_FLAG_ORDER = [
    "is_salt",
    "contains_cl",
    "contains_na",
    "contains_k",
    "contains_ca",
    "contains_br",
    "has_primary_amine",
    "has_secondary_amine",
    "has_carboxylic_acid",
    "has_phenol",
    "is_aromatic",
    "high_flexibility",
    "high_mw"
]


# ============================================================
# TEXT NORMALIZATION
# ============================================================

def normalize_name(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"\(.*?\)", "", text)
    text = re.sub(r"[^a-z0-9\s]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# ============================================================
# SMILES HANDLING (DEPLOYMENT SAFE)
# ============================================================

def canonicalize_smiles_or_fail(smiles: str) -> str:
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError("Invalid SMILES. Cannot be parsed by RDKit.")
    return Chem.MolToSmiles(mol)

# ============================================================
# FEATURE EXTRACTION
# ============================================================

def generate_ecfp(smiles: str) -> np.ndarray:
    mol = Chem.MolFromSmiles(smiles)
    fp = AllChem.GetMorganFingerprintAsBitVect(
        mol, radius=2, nBits=ECFP_BITS
    )
    return np.array(fp, dtype=int)


def compute_descriptors(smiles: str) -> np.ndarray:
    mol = Chem.MolFromSmiles(smiles)
    return np.array([
        Descriptors.MolWt(mol),
        Descriptors.MolLogP(mol),
        Lipinski.NumHDonors(mol),
        Lipinski.NumHAcceptors(mol),
        Descriptors.TPSA(mol),
        Lipinski.NumRotatableBonds(mol),
        Lipinski.NumAromaticRings(mol),
        Descriptors.HeavyAtomCount(mol)
    ], dtype=float)



def compute_structural_flags(smiles: str) -> dict:
    mol = Chem.MolFromSmiles(smiles)
    smiles_str = smiles.lower()
    return {
        "is_salt": "." in smiles_str,
        "contains_cl": int("[cl" in smiles_str),
        "contains_na": int("[na" in smiles_str),
        "contains_k": int("[k" in smiles_str),
        "contains_ca": int("[ca" in smiles_str),
        "contains_br": int("[br" in smiles_str),
        "has_primary_amine": int(Lipinski.NumHDonors(mol) > 0),
        "has_secondary_amine": int(Lipinski.NumHDonors(mol) == 1),
        "has_carboxylic_acid": int("c(=o)o" in smiles_str or "c(=o)[o-]" in smiles_str),
        "has_phenol": int("c1ccc(o)" in smiles_str or "c(o)" in smiles_str),
        "is_aromatic": int(Lipinski.NumAromaticRings(mol) > 0),
        "high_flexibility": int(Lipinski.NumRotatableBonds(mol) > 7),
        "high_mw": int(Descriptors.MolWt(mol) > 500)
    }


def compute_excipient_flags(excipient_norm: str) -> np.ndarray:
    flags = {flag: 0 for flag in EXCIPIENT_FLAG_ORDER}

    for key, category in EXCIPIENT_CATEGORY_MAP.items():
        if key in excipient_norm:
            flags[f"is_{category}"] = 1

    return np.array([flags[f] for f in EXCIPIENT_FLAG_ORDER], dtype=int)


def build_feature_vector(smiles: str, excipient_norm: str):
    smiles_can = canonicalize_smiles_or_fail(smiles)

    ecfp = generate_ecfp(smiles_can)
    desc = compute_descriptors(smiles_can)
    struct_flags_dict = compute_structural_flags(smiles_can)
    struct_flags = np.array(
                  [struct_flags_dict[k] for k in STRUCT_FLAG_ORDER],
                  dtype=int
                )
    excipient_flags = compute_excipient_flags(excipient_norm)

    X = np.concatenate([
        ecfp,
        desc,
        struct_flags,
        excipient_flags
    ])

    return X.reshape(1, -1), struct_flags_dict


# ============================================================
# DECISION LOGIC (FROZEN)
# ============================================================

def decision_from_probability(p_compatible: float):
    if p_compatible < 0.42:
        return "Incompatible", "High"
    elif p_compatible < 0.80:
        return "Compatible", "Medium"
    else:
        return "Compatible", "Low"


# ============================================================
# MAIN PREDICTION ENTRY (WEB CALL)
# ============================================================

def predict_for_web(drug_name: str, excipient_name: str, smiles: str):

    drug_norm = normalize_name(drug_name)
    excipient_norm = normalize_name(excipient_name)

    try:
        X_vec, struct_flags = build_feature_vector(
            smiles, excipient_norm
        )
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

    p_compatible = model.predict_proba(X_vec)[0][1]
    prediction, risk_level = decision_from_probability(p_compatible)

    summary = generate_analysis_summary(
        drug_name=drug_name,
        excipient_name=excipient_name,
        excipient_norm=excipient_norm,
        flags=struct_flags,
        probability=round(p_compatible, 3),
        risk_level=risk_level
    )

    return {
        "status": "success",
        "prediction": prediction,
        "risk_level": risk_level,
        "probability": round(p_compatible, 3),
        "analysis_summary": summary
    }


# In[ ]:




