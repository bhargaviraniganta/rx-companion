/**
 * Drug-Excipient Compatibility Prediction Service
 * 
 * This is a MOCK service that simulates ML model predictions.
 * In production, replace this with actual API calls to your backend
 * where the real ML model would be deployed.
 */

import { PredictionInput, PredictionResult, Excipient } from "@/types";

// Simulate network delay
const delay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Mock prediction logic based on excipient type
// This can be easily replaced with actual ML model API calls
const getPredictionForExcipient = (excipient: Excipient, drugName: string, smiles: string): PredictionResult => {
  // Simulated ML model predictions based on excipient
  const predictions: Record<Excipient, PredictionResult> = {
    "Lactose Monohydrate": {
      compatible: true,
      probability: 92.5,
      riskLevel: "LOW",
      summary: [
        "No reactive functional groups detected between drug and excipient",
        "Lactose monohydrate is generally compatible with most drug compounds",
        "Stable hydrogen bonding patterns observed",
        "Recommended for immediate release formulations",
      ],
    },
    "Microcrystalline Cellulose": {
      compatible: true,
      probability: 88.3,
      riskLevel: "LOW",
      summary: [
        "Cellulose structure shows no adverse interactions",
        "Suitable for direct compression formulations",
        "Good flow properties expected in final formulation",
        "No moisture-sensitive interactions detected",
      ],
    },
    "Magnesium Stearate": {
      compatible: false,
      probability: 34.2,
      riskLevel: "HIGH",
      summary: [
        "Potential lubricant-drug interaction detected",
        "Magnesium stearate may affect drug dissolution rate",
        "Hydrophobic coating effect may reduce bioavailability",
        "Consider alternative lubricants or reduced concentration",
      ],
    },
    "PVP": {
      compatible: true,
      probability: 85.7,
      riskLevel: "LOW",
      summary: [
        "PVP shows good binding compatibility",
        "May enhance drug solubility through solid dispersion",
        "Suitable for wet granulation processes",
        "No significant chemical interactions predicted",
      ],
    },
    "Starch": {
      compatible: true,
      probability: 78.9,
      riskLevel: "LOW",
      summary: [
        "Starch disintegrant function preserved",
        "Compatible with most active pharmaceutical ingredients",
        "Good swelling properties maintained",
        "Consider moisture sensitivity in storage",
      ],
    },
  };

  // Add drug-specific context to summary
  const result = { ...predictions[excipient] };
  result.summary = [
    `Analysis performed for ${drugName}`,
    `SMILES structure analyzed: ${smiles.substring(0, 30)}${smiles.length > 30 ? "..." : ""}`,
    ...result.summary,
  ];

  return result;
};

export const predictionService = {
  /**
   * Predict drug-excipient compatibility
   * @param input - Drug and excipient information
   * @returns Prediction result with compatibility, probability, and analysis
   */
  async predict(input: PredictionInput): Promise<PredictionResult> {
    await delay(); // Simulate API call latency

    // Validate input
    if (!input.drugName.trim()) {
      throw new Error("Drug name is required");
    }
    if (!input.smilesCode.trim()) {
      throw new Error("SMILES code is required");
    }
    if (!input.excipient) {
      throw new Error("Please select an excipient");
    }

    // Get mock prediction (replace with actual API call in production)
    const result = getPredictionForExcipient(
      input.excipient as Excipient,
      input.drugName,
      input.smilesCode
    );

    return result;
  },

  /**
   * Validate SMILES code format (basic validation)
   * In production, use RDKit or similar on backend for proper validation
   */
  validateSmiles(smiles: string): boolean {
    // Basic SMILES validation - should contain organic atoms
    const validChars = /^[A-Za-z0-9@+\-\[\]\(\)\\\/=#$.%]+$/;
    return validChars.test(smiles) && smiles.length > 0;
  },
};
