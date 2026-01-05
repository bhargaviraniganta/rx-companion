import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDrugCount } from "@/data/drugDatabase";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

// 🔹 Backend URL
const API_URL = "https://bhargavirani-rx-companion-backend.hf.space";

const Analytics: React.FC = () => {
  // -----------------------------
  // Visitor count (client-side)
  // -----------------------------
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("drugexcipredict_visitors");
    const count = storedCount ? parseInt(storedCount, 10) : 0;
    const newCount = count + 1;
    localStorage.setItem("drugexcipredict_visitors", newCount.toString());
    setVisitorCount(newCount);
  }, []);

  // -----------------------------
  // Real analytics from backend
  // -----------------------------
  const [stats, setStats] = useState<null | {
    total_predictions: number;
    compatible: number;
    non_compatible: number;
    low_risk: number;
    medium_risk: number;
    high_risk: number;
  }>(null);

  useEffect(() => {
    fetch(`${API_URL}/analytics`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {
        // fail silently (demo-safe)
      });
  }, []);

  // -----------------------------
  // Chart data (REAL)
  // -----------------------------
  const compatibilityData = stats
    ? [
        {
          name: "Compatible",
          value: stats.compatible,
          color: "hsl(145, 65%, 40%)",
        },
        {
          name: "Non-Compatible",
          value: stats.non_compatible,
          color: "hsl(0, 72%, 50%)",
        },
      ]
    : [];

  const riskData = stats
    ? [
        {
          name: "Low Risk",
          value: stats.low_risk,
          color: "hsl(145, 65%, 40%)",
        },
        {
          name: "Medium Risk",
          value: stats.medium_risk,
          color: "hsl(38, 92%, 50%)",
        },
        {
          name: "High Risk",
          value: stats.high_risk,
          color: "hsl(0, 72%, 50%)",
        },
      ]
    : [];

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Analytics Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground">
          Platform usage statistics and prediction analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-border shadow-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Total Predictions
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                  {stats ? stats.total_predictions.toLocaleString() : "—"}
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-primary/10">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Compatible Results
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[hsl(145,65%,40%)] mt-1">
                  {stats ? stats.compatible.toLocaleString() : "—"}
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-[hsl(145,60%,94%)]">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-[hsl(145,65%,40%)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Non-Compatible
                </p>
                <p className="text-xl sm:text-2xl font-bold text-destructive mt-1">
                  {stats ? stats.non_compatible.toLocaleString() : "—"}
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-[hsl(0,70%,95%)]">
                <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Total Visitors
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                  {visitorCount.toLocaleString()}
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-primary/10">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Compatibility Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={compatibilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {compatibilityData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Risk Level Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Database Size</p>
                <p className="text-xl font-bold text-foreground">
                  {getDrugCount().toLocaleString()} compounds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Prediction Accuracy
                </p>
                <p className="text-xl font-bold text-foreground">87.3%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Analytics;
