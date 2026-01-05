/**
 * Drug-Excipient Compatibility Prediction Service
 *
 * REAL service that calls the deployed ML backend (Hugging Face)
 */

import { PredictionInput, PredictionResult } from "@/types";

// 🔹 Your deployed backend URL
const API_URL = "https://bhargavirani-rx-companion-backend.hf.space";

export const predictionService = {
  /**
   * Predict drug–excipient compatibility using real ML backend
   */
  async predict(input: PredictionInput): Promise<PredictionResult> {
    // Frontend validation (keep this)
    if (!input.drugName.trim()) {
      throw new Error("Drug name is required");
    }
    if (!input.smilesCode.trim()) {
      throw new Error("SMILES code is required");
    }
    if (!input.excipient) {
      throw new Error("Please select an excipient");
    }

    // Call backend
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        drug_name: input.drugName,
        excipient_name: input.excipient,
        smiles: input.smilesCode,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Prediction failed");
    }

    const data = await response.json();

    // 🔹 Map backend response → frontend format
    return {
      compatible: data.prediction === "Compatible",
      probability: Math.round(data.probability * 100 * 10) / 10, // e.g. 87.3
      riskLevel: data.risk_level.toUpperCase(), // LOW / MEDIUM / HIGH
      summary: data.analysis_summary.split("\n\n"), // backend text → bullet list
    };
  },

  /**
   * Keep SMILES validation (frontend-only)
   */
  validateSmiles(smiles: string): boolean {
    const validChars = /^[A-Za-z0-9@+\-\[\]\(\)\\\/=#$.%]+$/;
    return validChars.test(smiles) && smiles.length > 0;
  },
};
