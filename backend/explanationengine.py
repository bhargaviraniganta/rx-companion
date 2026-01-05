
# Frozen excipient category mapping
EXCIPIENT_CATEGORIES = {
    "lactose": "reducing sugar excipient",
    "mannitol": "non-reducing sugar alcohol excipient",
    "sorbitol": "non-reducing sugar alcohol excipient",
    "mcc": "inert filler excipient",
    "microcrystalline cellulose": "inert filler excipient",
    "pvp": "polymeric binder excipient",
    "pvp k30": "polymeric binder excipient",
    "hpmc": "polymeric excipient",
    "magnesium stearate": "lubricant excipient",
    "sodium starch glycolate": "disintegrant excipient",
    "starch": "disintegrant excipient",
    "dcp": "inorganic filler excipient",
    "calcium phosphate": "inorganic filler excipient"
}


def structural_cues(flags: dict):
    """
    Generates human-readable structural cues
    based on detected molecular flags.
    """
    cues = []

    if flags.get("has_primary_amine", False):
        cues.append("amine-associated structural motifs are present")

    if flags.get("has_carboxylic_acid", False):
        cues.append("acidic functional groups are present")

    if flags.get("has_phenol", False):
        cues.append("phenolic structural motifs are present")

    if flags.get("is_salt", False):
        cues.append("salt-form molecular characteristics are observed")

    if not cues:
        cues.append(
            "no frequently observed high-risk structural motifs were prominent"
        )

    return cues


def risk_closing_line(risk_level: str):
    """
    Final closing sentence based on predicted risk.
    """
    if risk_level == "Low":
        return "Confidence is high within the limits of available data."
    elif risk_level == "Medium":
        return "Moderate uncertainty suggests confirmatory testing."
    else:
        return "Elevated risk observed; laboratory compatibility testing is recommended."


def generate_analysis_summary(
    drug_name: str,
    excipient_name: str,
    excipient_norm: str,
    flags: dict,
    probability: float,
    risk_level: str
):
    """
    Generates a structured, human-readable explanation
    for the prediction output.
    """

    # Excipient category lookup
    excipient_category = EXCIPIENT_CATEGORIES.get(
        excipient_norm.lower(),
        "pharmaceutical excipient with variable compatibility behavior"
    )

    # Structural interpretation
    cues = structural_cues(flags)

    summary = [
        "The prediction is based on learned molecular structure patterns of the drug and historical compatibility data.",
        f"Structural assessment indicates that {', '.join(cues)}.",
        f"{excipient_name} is classified as a {excipient_category}, which shows formulation-dependent compatibility trends.",
        f"Based on combined drug structure patterns and excipient category behavior, the model estimates a {risk_level.lower()} incompatibility risk for this combination.",
        "This is a data-driven risk assessment and does not replace experimental validation.",
        risk_closing_line(risk_level)
    ]

    return "\n\n".join(summary)
