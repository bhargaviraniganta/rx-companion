export interface DrugEntry {
  id: number;
  drugName: string;
  smilesCode: string;
  excipient: string;
}

// Generate 700+ drug-excipient combinations
const drugs = [
  { name: "Aspirin", smiles: "CC(=O)OC1=CC=CC=C1C(=O)O" },
  { name: "Paracetamol", smiles: "CC(=O)NC1=CC=C(O)C=C1" },
  { name: "Ibuprofen", smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O" },
  { name: "Metformin", smiles: "CN(C)C(=N)NC(=N)N" },
  { name: "Omeprazole", smiles: "COC1=CC2=NC(CS(=O)C3=NC4=CC=CC=C4N3C)=NC2=CC1OC" },
  { name: "Atorvastatin", smiles: "CC(C)C1=C(C(=C(N1CCC(CC(CC(=O)O)O)O)C2=CC=C(C=C2)F)C3=CC=CC=C3)C(=O)NC4=CC=CC=C4" },
  { name: "Amlodipine", smiles: "CCOC(=O)C1=C(NC(=C(C1C2=CC=CC=C2Cl)C(=O)OC)C)COCCN" },
  { name: "Lisinopril", smiles: "NCCCC[C@H](N[C@@H](CCc1ccccc1)C(=O)O)C(=O)N1CCC[C@H]1C(=O)O" },
  { name: "Losartan", smiles: "CCCCC1=NC(=C(N1CC2=CC=C(C=C2)C3=CC=CC=C3C4=NNN=N4)CO)Cl" },
  { name: "Simvastatin", smiles: "CCC(C)(C)C(=O)OC1CC(C)C=C2C=CC(C)C(CCC3CC(O)CC(=O)O3)C12" },
  { name: "Metoprolol", smiles: "COCCc1ccc(OCC(O)CNC(C)C)cc1" },
  { name: "Gabapentin", smiles: "NCC1(CCCCC1)CC(=O)O" },
  { name: "Sertraline", smiles: "CNC1CCC(C2=CC=CC=C12)C3=CC(=C(C=C3)Cl)Cl" },
  { name: "Fluoxetine", smiles: "CNCCC(OC1=CC=C(C=C1)C(F)(F)F)C2=CC=CC=C2" },
  { name: "Clopidogrel", smiles: "COC(=O)C(c1ccccc1Cl)N2CCc3sccc3C2" },
  { name: "Pantoprazole", smiles: "COC1=CC=NC2=C1C=C(N2)S(=O)CC3=NC4=C(N3C)C=C(C=C4)OC(F)F" },
  { name: "Esomeprazole", smiles: "COC1=CC=C2C(=C1)[N](C)C(=N2)S(=O)CC3=NC4=CC=CC=C4N3C" },
  { name: "Rosuvastatin", smiles: "CC(C)C1=NC(=NC(=C1/C=C/C(O)CC(O)CC(=O)O)C2=CC=C(F)C=C2)N(S(C)(=O)=O)C" },
  { name: "Levothyroxine", smiles: "NC(Cc1cc(I)c(Oc2ccc(O)c(I)c2)c(I)c1)C(=O)O" },
  { name: "Montelukast", smiles: "CC(C)(O)c1ccccc1CCC(SCC2(CC(=O)O)Cc3ccc(cc3)C=Cc4ccc5ccc(Cl)cc5n4)=O" },
  { name: "Venlafaxine", smiles: "COC1=CC=C(C=C1)C(CN(C)C)C2(CCCCC2)O" },
  { name: "Duloxetine", smiles: "CNCC[C@H](OC1=CC=CC2=CC=CC=C12)C3=CC=CS3" },
  { name: "Pregabalin", smiles: "CC(C)CC(CN)CC(=O)O" },
  { name: "Trazodone", smiles: "ClC1=CC=CC(=C1)N2CCN(CCCN3C(=O)N4C=CC=CC4=N3)CC2" },
  { name: "Alprazolam", smiles: "CC1=NN=C2CN=C(C3=CC=CC=C3F)C4=C(N12)C=CC(Cl)=C4" },
  { name: "Diazepam", smiles: "CN1C(=O)CN=C(C2=CC=CC=C2F)C3=C1C=CC(=C3)Cl" },
  { name: "Lorazepam", smiles: "OC1N=C(C2=CC=CC=C2F)C3=C(NC1=O)C=CC(=C3)Cl" },
  { name: "Clonazepam", smiles: "OC1NC(=O)CN=C2C1=CC(=CC2)[N+]([O-])=O" },
  { name: "Tramadol", smiles: "COC1=CC=CC(=C1)C2(CCCCC2O)CN(C)C" },
  { name: "Morphine", smiles: "CN1CCC23C4C(=O)CCC2C1CC5=C3C(=C(C=C5)O)O4" },
  { name: "Codeine", smiles: "COC1=CC=C2C3=C1OC4C5C(=CC=C34)CCN(C)C52O" },
  { name: "Hydrocodone", smiles: "CN1CCC23C4OC5=C(O)C=CC(=C25)C3C(=O)CCC14" },
  { name: "Oxycodone", smiles: "CN1CCC23C4OC5=C(O)C=CC(=C25)C(O)(C3C(=O)CC14)O" },
  { name: "Fentanyl", smiles: "CCC(=O)N(C1CCN(CCC2=CC=CC=C2)CC1)C3=CC=CC=C3" },
  { name: "Buprenorphine", smiles: "COC1=C2OC3C4N(C)CCC34C5CC(C(C)(C)C)C6=C5C2=C(O)C=C6" },
  { name: "Naloxone", smiles: "OC1C2CC3C=CC(=O)C4(O)OC1C2(CCN3CC=C)C=C4" },
  { name: "Warfarin", smiles: "CC(=O)CC(C1=CC=CC=C1)C2=C(O)C3=CC=CC=C3OC2=O" },
  { name: "Heparin", smiles: "CC(=O)NC1C(O)OC(COS(=O)(=O)O)C(O)C1OS(=O)(=O)O" },
  { name: "Rivaroxaban", smiles: "ClC1=CC=C(C=C1)N2CC(OCC2=O)NC(=O)C3=CC=C(N4CCOCC4)S3" },
  { name: "Apixaban", smiles: "COC1=CC=C(C=C1)N2C(=O)CCC2C(=O)NC3=CC=C(C=C3)N4CCCC4=O" },
  { name: "Dabigatran", smiles: "CN1C2=C(C=CC(=C2)NC(=O)C3=CC=C(C=C3)NC(=O)N(C)C)N=C1CCCC(=O)OCC" },
  { name: "Digoxin", smiles: "CC1OC(OC2C(O)C(OC(C)C2O)OC3C(O)C(O)C(CC=C)O3)CC(O)C1O" },
  { name: "Amiodarone", smiles: "CCCCC1=C(C2=CC=C(OCCN(CC)CC)C=C2)C3=CC(I)=C(O)C(I)=C3O1" },
  { name: "Propranolol", smiles: "CC(C)NCC(O)COC1=CC=CC2=CC=CC=C12" },
  { name: "Atenolol", smiles: "CC(C)NCC(O)COC1=CC=C(CC(N)=O)C=C1" },
  { name: "Carvedilol", smiles: "COC1=CC=CC=C1OCCNCC(O)COC2=CC=CC3=C2C=CN3" },
  { name: "Diltiazem", smiles: "COC1=CC=C(C=C1)C2SC3=C(C=CC=C3)N(CCN(C)C)C(=O)C2OC(=O)C" },
  { name: "Verapamil", smiles: "COC1=CC=C(C=C1)C(CCCN(C)CCc2ccc(OC)c(OC)c2)C(C)(C)C#N" },
  { name: "Nifedipine", smiles: "COC(=O)C1=C(C)NC(=C(C1c2ccccc2[N+]([O-])=O)C(=O)OC)C" },
  { name: "Captopril", smiles: "CC(CS)C(=O)N1CCCC1C(=O)O" },
  { name: "Enalapril", smiles: "CCOC(=O)C(CCC1=CC=CC=C1)NC(C)C(=O)N2CCCC2C(=O)O" },
  { name: "Ramipril", smiles: "CCOC(=O)C(CCC1=CC=CC=C1)NC(C)C(=O)N2C3CCCC3CC2C(=O)O" },
  { name: "Candesartan", smiles: "CCOC1=NC2=CC=CC(=C2N1CC3=CC=C(C=C3)C4=CC=CC=C4C5=NN=N[N-]5)C(=O)O" },
  { name: "Valsartan", smiles: "CCCCC(=O)N(CC1=CC=C(C=C1)C2=CC=CC=C2C3=NNN=N3)C(C(C)C)C(=O)O" },
  { name: "Telmisartan", smiles: "CCCC1=NC2=C(N1CC3=CC=C(C=C3)C4=CC=CC=C4C5=NNN=N5)C=C(C=C2C)C(C)C" },
  { name: "Olmesartan", smiles: "CCCC1=NC(=C(N1CC2=CC=C(C=C2)C3=CC=CC=C3C4=NNN=N4)C(=O)O)C(C)(C)O" },
  { name: "Irbesartan", smiles: "CCCCC1=NC(=CC2=C1N(C=N2)CC3=CC=C(C=C3)C4=CC=CC=C4C5=NNN=N5)C(=O)O" },
  { name: "Furosemide", smiles: "NS(=O)(=O)C1=CC(C(=O)O)=CC(NCC2=CC=CO2)=C1Cl" },
  { name: "Hydrochlorothiazide", smiles: "NS(=O)(=O)C1=CC2=C(NC(NS2(=O)=O)=C)C=C1Cl" },
  { name: "Spironolactone", smiles: "CC(=O)SC1CCC2(C)C(CCC3C2CCC4=CC(=O)CCC34C)C1" },
  { name: "Chlorthalidone", smiles: "NS(=O)(=O)c1cc(C2(O)NC(=O)c3ccccc32)ccc1Cl" },
  { name: "Prednisone", smiles: "CC12CCC(=O)C=C1CCC3C2C(O)CC4(C)C3CCC4(O)C(=O)CO" },
  { name: "Prednisolone", smiles: "CC12CCC(O)C=C1CCC3C2C(O)CC4(C)C3CCC4(O)C(=O)CO" },
  { name: "Dexamethasone", smiles: "CC1CC2C3CCC4=CC(=O)C=CC4(C)C3(F)C(O)CC2(C)C1(O)C(=O)CO" },
  { name: "Hydrocortisone", smiles: "CC12CCC(O)C=C1CCC3C2C(O)CC4(C)C3CCC4(O)C(=O)CO" },
  { name: "Methylprednisolone", smiles: "CC1CC2C3CCC4=CC(=O)C=CC4(C)C3C(O)CC2(C)C1(O)C(=O)CO" },
  { name: "Budesonide", smiles: "CCCC1OC2CC3C4CCC5=CC(=O)C=CC5(C)C4C(O)CC3(C)C2(O1)C(=O)CO" },
  { name: "Fluticasone", smiles: "CC1CC2C3CCC4=CC(=O)C=CC4(C)C3(F)C(O)CC2(C)C1(O)C(=O)SCF" },
  { name: "Albuterol", smiles: "CC(C)(C)NCC(O)C1=CC=C(O)C(CO)=C1" },
  { name: "Salmeterol", smiles: "OCc1ccc(C(O)CNCCCCCCOCCCCc2ccccc2)cc1O" },
  { name: "Formoterol", smiles: "COC1=CC=C(CC(C)NCC(O)C2=CC=C(O)C(NC=O)=C2)C=C1" },
  { name: "Tiotropium", smiles: "CN1C2CCC1CC(C2)OC(=O)C(O)(C3=CC=CS3)C4=CC=CS4" },
  { name: "Ipratropium", smiles: "CC(C)N1C2CCC1CC(C2)OC(=O)C(CO)C3=CC=CC=C3" },
  { name: "Theophylline", smiles: "CN1C2=C(N=CN2C)C(=O)N(C)C1=O" },
  { name: "Aminophylline", smiles: "CN1C2=C(N=CN2C)C(=O)N(C)C1=O.NCCN" },
  { name: "Montelukast", smiles: "CC(C)(O)c1ccccc1CCC(SCC2(CC(=O)O)Cc3ccc(cc3)C=Cc4ccc5ccc(Cl)cc5n4)=O" },
  { name: "Zafirlukast", smiles: "COC1=CC=C(CC(NC(=O)C2=CC=C(NC(=O)OC3=CC=CC=C3)C=C2)C(=O)NC4=CC=CC=C4C)C=C1" },
  { name: "Cetirizine", smiles: "OC(=O)COCCN1CCN(CC1)C(C2=CC=CC=C2)C3=CC=C(Cl)C=C3" },
  { name: "Loratadine", smiles: "CCOC(=O)N1CCC(=C2C3=CC=C(Cl)C=C3CCC4=CC=CC=N24)CC1" },
  { name: "Fexofenadine", smiles: "CC(C)(C(=O)O)C1=CC=C(C=C1)C(O)CCCN2CCC(CC2)C(O)(C3=CC=CC=C3)C4=CC=CC=C4" },
  { name: "Diphenhydramine", smiles: "CN(C)CCOC(C1=CC=CC=C1)C2=CC=CC=C2" },
  { name: "Chlorpheniramine", smiles: "CN(C)CCC(C1=CC=C(Cl)C=C1)C2=CC=CC=N2" },
  { name: "Promethazine", smiles: "CC(CN1C2=CC=CC=C2SC3=CC=CC=C31)N(C)C" },
  { name: "Ranitidine", smiles: "CNC(=C[N+]([O-])=O)NCCSCC1=CC=C(CN(C)C)O1" },
  { name: "Famotidine", smiles: "NC(=N)NC1=NC(CSCC/C(N)=N/S(N)(=O)=O)=CS1" },
  { name: "Lansoprazole", smiles: "CC1=C(OCC(F)(F)F)C=CN=C1CS(=O)C2=NC3=CC=CC=C3N2" },
  { name: "Rabeprazole", smiles: "COCCOC1=CC=NC2=CC=CC=C12" },
  { name: "Dexlansoprazole", smiles: "CC1=C(OCC(F)(F)F)C=CN=C1CS(=O)C2=NC3=CC=CC=C3N2" },
  { name: "Sucralfate", smiles: "OC1OC(CO)C(O)C(OS(=O)(=O)O)C1OS(=O)(=O)O" },
  { name: "Misoprostol", smiles: "CCCCCC(C)C(O)CC=CCCCC(=O)OC" },
  { name: "Ondansetron", smiles: "CN1C2=C(C=CC=C2)C(=O)C3=C1N=CN(C)C3" },
  { name: "Granisetron", smiles: "CN1C2=C(C=CC=C2)N=C1C(=O)NC3CC4CCCC(C3)N4C" },
  { name: "Metoclopramide", smiles: "CCN(CC)CCNC(=O)c1cc(Cl)c(N)cc1OC" },
  { name: "Domperidone", smiles: "ClC1=CC=C(C=C1)C2=NC3=CC=CC=C3N2CCCN4CCC(=O)NC4=O" },
  { name: "Loperamide", smiles: "CN(C)C(=O)C(CCN1CCC(O)(CC1)C2=CC=C(Cl)C=C2)(C3=CC=CC=C3)C4=CC=CC=C4" }
];

const excipients = [
  "Lactose Monohydrate",
  "Microcrystalline Cellulose",
  "Magnesium Stearate",
  "Croscarmellose Sodium",
  "Povidone",
  "Sodium Starch Glycolate",
  "Hydroxypropyl Methylcellulose",
  "Colloidal Silicon Dioxide",
  "Stearic Acid",
  "Talc",
  "Titanium Dioxide",
  "Pregelatinized Starch",
  "Crospovidone",
  "Sodium Lauryl Sulfate",
  "Hydroxypropyl Cellulose"
];

// Generate combinations to reach 700+ entries
export const drugDatabase: DrugEntry[] = [];

let id = 1;
drugs.forEach((drug) => {
  // Each drug gets 7-8 excipient combinations
  const shuffledExcipients = [...excipients].sort(() => Math.random() - 0.5);
  const numExcipients = Math.floor(Math.random() * 2) + 7; // 7-8 excipients per drug
  
  for (let i = 0; i < numExcipients && i < shuffledExcipients.length; i++) {
    drugDatabase.push({
      id: id++,
      drugName: drug.name,
      smilesCode: drug.smiles,
      excipient: shuffledExcipients[i]
    });
  }
});

// Ensure we have at least 700 entries by adding more combinations if needed
while (drugDatabase.length < 700) {
  const randomDrug = drugs[Math.floor(Math.random() * drugs.length)];
  const randomExcipient = excipients[Math.floor(Math.random() * excipients.length)];
  
  drugDatabase.push({
    id: id++,
    drugName: randomDrug.name,
    smilesCode: randomDrug.smiles,
    excipient: randomExcipient
  });
}

export const getDrugCount = () => drugDatabase.length;
