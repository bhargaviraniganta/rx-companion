import React from "react";
import { BookOpen, ExternalLink, FileText, GraduationCap, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Reference {
  title: string;
  description: string;
  url: string;
  category: "handbook" | "study" | "ml" | "general";
}

const references: Reference[] = [
  {
    title: "Handbook of Pharmaceutical Excipients",
    description: "Comprehensive reference guide covering physical and chemical properties of excipients used in pharmaceutical formulations.",
    url: "https://www.pharmpress.com/product/9780857113757/handbook-of-pharmaceutical-excipients",
    category: "handbook"
  },
  {
    title: "Drug-Excipient Compatibility Studies - AAPS Guidelines",
    description: "American Association of Pharmaceutical Scientists guidelines on conducting and interpreting compatibility studies.",
    url: "https://www.aaps.org/",
    category: "study"
  },
  {
    title: "Pharmaceutical Excipients: Properties, Functionality, and Applications",
    description: "Detailed exploration of excipient properties and their role in drug delivery systems.",
    url: "https://onlinelibrary.wiley.com/",
    category: "handbook"
  },
  {
    title: "Machine Learning in Drug Discovery and Development",
    description: "Overview of machine learning applications in pharmaceutical research and formulation development.",
    url: "https://www.nature.com/articles/s41573-019-0024-5",
    category: "ml"
  },
  {
    title: "Computational Approaches for Drug-Excipient Compatibility",
    description: "Research on using computational methods to predict drug-excipient interactions.",
    url: "https://pubs.acs.org/",
    category: "ml"
  },
  {
    title: "ICH Guidelines - Stability Testing",
    description: "International Council for Harmonisation guidelines on stability testing of pharmaceutical products.",
    url: "https://www.ich.org/page/quality-guidelines",
    category: "study"
  },
  {
    title: "SMILES Tutorial and Applications",
    description: "Guide to Simplified Molecular Input Line Entry System notation used in cheminformatics.",
    url: "https://www.daylight.com/dayhtml/doc/theory/theory.smiles.html",
    category: "general"
  },
  {
    title: "PubChem Database",
    description: "Open chemistry database with information on chemical structures and biological activities.",
    url: "https://pubchem.ncbi.nlm.nih.gov/",
    category: "general"
  },
  {
    title: "DrugBank Database",
    description: "Comprehensive resource combining drug data with drug target information.",
    url: "https://go.drugbank.com/",
    category: "general"
  },
  {
    title: "Artificial Intelligence in Pharmaceutical Sciences",
    description: "Review of AI methodologies applied to drug formulation and compatibility prediction.",
    url: "https://www.sciencedirect.com/",
    category: "ml"
  },
  {
    title: "USP-NF Standards for Excipients",
    description: "United States Pharmacopeia standards and specifications for pharmaceutical excipients.",
    url: "https://www.usp.org/",
    category: "handbook"
  },
  {
    title: "Thermal Analysis Methods for Compatibility Studies",
    description: "Application of DSC and TGA in evaluating drug-excipient interactions.",
    url: "https://www.sciencedirect.com/topics/chemistry/thermal-analysis",
    category: "study"
  }
];

const getCategoryIcon = (category: Reference["category"]) => {
  switch (category) {
    case "handbook":
      return BookOpen;
    case "study":
      return FileText;
    case "ml":
      return FlaskConical;
    case "general":
      return GraduationCap;
  }
};

const getCategoryLabel = (category: Reference["category"]) => {
  switch (category) {
    case "handbook":
      return "Reference Handbook";
    case "study":
      return "Research Study";
    case "ml":
      return "Machine Learning";
    case "general":
      return "General Resource";
  }
};

const References: React.FC = () => {
  const groupedRefs = {
    handbook: references.filter(r => r.category === "handbook"),
    study: references.filter(r => r.category === "study"),
    ml: references.filter(r => r.category === "ml"),
    general: references.filter(r => r.category === "general"),
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            References & Resources
          </h1>
        </div>
        <p className="text-muted-foreground">
          Scientific literature and databases for drug-excipient compatibility research
        </p>
      </div>

      {/* Reference Handbooks */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Reference Handbooks
        </h2>
        <div className="grid gap-4">
          {groupedRefs.handbook.map((ref, index) => (
            <ReferenceCard key={index} reference={ref} />
          ))}
        </div>
      </section>

      {/* Research Studies */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Research & Guidelines
        </h2>
        <div className="grid gap-4">
          {groupedRefs.study.map((ref, index) => (
            <ReferenceCard key={index} reference={ref} />
          ))}
        </div>
      </section>

      {/* Machine Learning */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          Machine Learning in Pharma
        </h2>
        <div className="grid gap-4">
          {groupedRefs.ml.map((ref, index) => (
            <ReferenceCard key={index} reference={ref} />
          ))}
        </div>
      </section>

      {/* General Resources */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          General Resources
        </h2>
        <div className="grid gap-4">
          {groupedRefs.general.map((ref, index) => (
            <ReferenceCard key={index} reference={ref} />
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <Card className="border-border bg-muted/30">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Note:</strong> This tool is intended for educational 
            and preliminary research purposes. All predictions should be validated through appropriate 
            experimental methods before use in pharmaceutical development. External links are provided 
            for reference and are not affiliated with this application.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

const ReferenceCard: React.FC<{ reference: Reference }> = ({ reference }) => {
  const Icon = getCategoryIcon(reference.category);
  
  return (
    <Card className="border-border shadow-card hover:shadow-card-hover transition-shadow">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-accent flex-shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {reference.title}
                </h3>
                <span className="inline-block text-xs text-primary bg-accent px-2 py-0.5 rounded mb-2">
                  {getCategoryLabel(reference.category)}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reference.description}
                </p>
              </div>
              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-colors text-primary"
                aria-label={`Open ${reference.title} in new tab`}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default References;
