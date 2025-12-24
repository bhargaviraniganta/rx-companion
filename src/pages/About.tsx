import React from "react";
import { FlaskConical, Brain, Shield, Microscope, Target, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Machine Learning Powered",
      description: "Utilizes advanced ML algorithms trained on extensive pharmaceutical datasets to predict drug-excipient interactions."
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Provides comprehensive risk level analysis to help researchers make informed formulation decisions."
    },
    {
      icon: Target,
      title: "High Accuracy",
      description: "Achieves reliable predictions through validated computational models and molecular descriptor analysis."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate compatibility predictions without the need for lengthy experimental procedures."
    }
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-6">
          <FlaskConical className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Drug–Excipient Compatibility
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A machine learning-based prediction tool for assessing pharmaceutical ingredient interactions
        </p>
      </div>

      {/* What is Drug-Excipient Compatibility */}
      <Card className="mb-12 border-border shadow-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-4">
            <Microscope className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                What is Drug–Excipient Compatibility?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Drug-excipient compatibility refers to the physicochemical stability and interaction potential 
                between an active pharmaceutical ingredient (API) and the inactive components (excipients) used 
                in a formulation. Excipients serve critical functions including binding, filling, lubricating, 
                and stabilizing pharmaceutical preparations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Incompatibility between drugs and excipients can lead to reduced therapeutic efficacy, 
                altered bioavailability, accelerated degradation, or formation of toxic byproducts. 
                Understanding these interactions is essential for developing safe and effective drug products.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why This Project */}
      <Card className="mb-12 border-border shadow-card">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Why This Project?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Traditional compatibility testing requires extensive laboratory work, including thermal analysis 
            (DSC), spectroscopic methods (FTIR, XRD), and accelerated stability studies. These experimental 
            approaches are time-consuming, resource-intensive, and may not cover all possible combinations.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">DrugExciPredict</strong> addresses these challenges by providing 
            a computational approach to predict compatibility before physical testing. This enables researchers to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Screen multiple excipient options rapidly</li>
            <li>Reduce experimental costs and time</li>
            <li>Prioritize formulations for laboratory validation</li>
            <li>Understand potential interaction mechanisms</li>
          </ul>
        </CardContent>
      </Card>

      {/* ML Concept */}
      <Card className="mb-12 border-border shadow-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-4">
            <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Machine Learning Approach
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This tool employs machine learning models trained on curated datasets of known drug-excipient 
                interactions. The prediction process involves:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li><strong className="text-foreground">Molecular Representation:</strong> SMILES notation encodes the chemical structure of the drug</li>
                <li><strong className="text-foreground">Feature Extraction:</strong> Molecular descriptors capture physicochemical properties</li>
                <li><strong className="text-foreground">Pattern Recognition:</strong> ML algorithms identify compatibility patterns from training data</li>
                <li><strong className="text-foreground">Probability Estimation:</strong> Outputs a compatibility score with associated confidence level</li>
              </ol>
              <p className="text-muted-foreground leading-relaxed">
                The model considers factors such as molecular weight, functional groups, solubility parameters, 
                and known interaction mechanisms to generate predictions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={index} className="border-border shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="gradient-primary text-primary-foreground px-8"
          onClick={() => navigate("/predict")}
        >
          <FlaskConical className="mr-2 h-5 w-5" />
          Start Prediction Analysis
        </Button>
      </div>
    </main>
  );
};

export default About;
