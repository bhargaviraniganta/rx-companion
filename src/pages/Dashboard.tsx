import React, { useState } from "react";
import { PredictionInput, PredictionResult as PredictionResultType } from "@/types";
import { predictionService } from "@/services/predictionService";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PredictionForm from "@/components/dashboard/PredictionForm";
import PredictionResultComponent from "@/components/dashboard/PredictionResult";
import { useToast } from "@/hooks/use-toast";

const Dashboard: React.FC = () => {
  const [input, setInput] = useState<PredictionInput>({
    drugName: "",
    smilesCode: "",
    excipient: "",
  });
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePredict = async () => {
    if (!input.drugName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a drug name",
        variant: "destructive",
      });
      return;
    }

    if (!input.smilesCode.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a SMILES code",
        variant: "destructive",
      });
      return;
    }

    if (!predictionService.validateSmiles(input.smilesCode)) {
      toast({
        title: "Invalid SMILES",
        description: "Please enter a valid SMILES notation",
        variant: "destructive",
      });
      return;
    }

    if (!input.excipient) {
      toast({
        title: "Validation Error",
        description: "Please select an excipient",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const prediction = await predictionService.predict(input);
      setResult(prediction);
      toast({
        title: "Analysis Complete",
        description: `Prediction: ${prediction.compatible ? "Compatible" : "Non-Compatible"}`,
      });
    } catch (error) {
      toast({
        title: "Prediction Error",
        description: error instanceof Error ? error.message : "Failed to generate prediction",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Drug-Excipient Compatibility Predictor
          </h1>
          <p className="text-muted-foreground mt-1">
            Analyze potential interactions between active pharmaceutical ingredients and excipients
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PredictionForm
            input={input}
            onChange={setInput}
            onSubmit={handlePredict}
            isLoading={isLoading}
          />
          <PredictionResultComponent result={result} isLoading={isLoading} />
        </div>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl shadow-card p-5">
            <h3 className="font-semibold text-foreground mb-2">About Predictions</h3>
            <p className="text-sm text-muted-foreground">
              Our ML model analyzes molecular structures and known interaction patterns to predict compatibility between drugs and excipients.
            </p>
          </div>
          <div className="bg-card rounded-xl shadow-card p-5">
            <h3 className="font-semibold text-foreground mb-2">SMILES Notation</h3>
            <p className="text-sm text-muted-foreground">
              SMILES (Simplified Molecular Input Line Entry System) is a specification for describing the structure of chemical species.
            </p>
          </div>
          <div className="bg-card rounded-xl shadow-card p-5">
            <h3 className="font-semibold text-foreground mb-2">Research Use Only</h3>
            <p className="text-sm text-muted-foreground">
              These predictions are intended for preliminary research. Always verify with laboratory testing before formulation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
