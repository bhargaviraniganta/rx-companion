import React from "react";
import { PredictionInput } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ExcipientCombobox from "./ExcipientCombobox";
import { FlaskConical, Loader2, Atom, TestTube } from "lucide-react";
import DrugCombobox from "./DrugCombobox";


/* 🔹 Drug name suggestions (editable, lightweight, no performance impact) */
const DRUG_SUGGESTIONS = [
  "Aspirin",
  "Ibuprofen",
  "Paracetamol",
  "Metformin",
  "Amoxicillin",
  "Atorvastatin",
  "Ciprofloxacin",
  "Omeprazole",
  "Losartan",
  "Diclofenac",
  "Clopidogrel",
  "Azithromycin",
  "Pantoprazole",
  "Levothyroxine",
  "Warfarin",
];

interface PredictionFormProps {
  input: PredictionInput;
  onChange: (input: PredictionInput) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({
  input,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <TestTube className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Input Parameters
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter drug and excipient details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 🔹 Drug Name (dropdown + typing) */}
        <div className="space-y-2">
        <Label htmlFor="drugName" className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-muted-foreground" />
          Drug Name
        </Label>

        <DrugCombobox
          value={input.drugName}
          onChange={(value) =>
            onChange({ ...input, drugName: value })
          }
          disabled={isLoading}
        />
      </div>

        {/* SMILES */}
        <div className="space-y-2">
          <Label htmlFor="smilesCode" className="flex items-center gap-2">
            <Atom className="h-4 w-4 text-muted-foreground" />
            SMILES Code
          </Label>
          <Input
            id="smilesCode"
            type="text"
            placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
            value={input.smilesCode}
            onChange={(e) =>
              onChange({ ...input, smilesCode: e.target.value })
            }
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            Simplified Molecular Input Line Entry System notation
          </p>
        </div>

        {/* Excipient */}
        <div className="space-y-2">
          <Label htmlFor="excipient">Excipient</Label>
          <ExcipientCombobox
            value={input.excipient}
            onChange={(value) =>
              onChange({ ...input, excipient: value })
            }
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            Select from suggestions or enter a custom excipient
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full mt-6"
          size="lg"
          variant="gradient"
          disabled={
            isLoading ||
            !input.drugName ||
            !input.smilesCode ||
            !input.excipient
          }
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <FlaskConical className="h-5 w-5" />
              Predict Compatibility
            </>
          )}
        </Button>
      </form>

      {/* Tips */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">
          Quick Tips
        </h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Use canonical SMILES for consistent results
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Check for stereochemistry when applicable
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Consider salt forms in drug name
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PredictionForm;
