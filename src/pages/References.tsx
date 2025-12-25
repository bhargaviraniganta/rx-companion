import React from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const References: React.FC = () => {
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
          Scientific literature for drug-excipient compatibility research
        </p>
      </div>

      <Card className="border-border shadow-card hover:shadow-card-hover transition-shadow">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-accent flex-shrink-0">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Handbook of Pharmaceutical Excipients
                  </h3>
                  <span className="inline-block text-xs text-primary bg-accent px-2 py-0.5 rounded mb-2">
                    Reference Handbook
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Comprehensive reference guide covering physical and chemical properties of excipients used in pharmaceutical formulations.
                  </p>
                </div>
                <a
                  href="https://adiyugatama.wordpress.com/wp-content/uploads/2012/03/handbook-of-pharmaceutical-excipients-6th-ed.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-colors text-primary"
                  aria-label="Open Handbook of Pharmaceutical Excipients in new tab"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-border bg-muted/30 mt-8">
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

export default References;
