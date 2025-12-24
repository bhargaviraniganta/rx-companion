import React, { useEffect, useState } from "react";
import { BarChart3, Users, CheckCircle, XCircle, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDrugCount } from "@/data/drugDatabase";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const Analytics: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  // Simulate visitor count using localStorage
  useEffect(() => {
    const storedCount = localStorage.getItem("drugexcipredict_visitors");
    const count = storedCount ? parseInt(storedCount, 10) : 0;
    const newCount = count + 1;
    localStorage.setItem("drugexcipredict_visitors", newCount.toString());
    setVisitorCount(newCount);
  }, []);

  // Mock statistics data
  const stats = {
    totalPredictions: 1247,
    compatible: 823,
    nonCompatible: 424,
    lowRisk: 687,
    highRisk: 560,
    databaseSize: getDrugCount(),
  };

  const compatibilityData = [
    { name: "Compatible", value: stats.compatible, color: "hsl(145, 65%, 40%)" },
    { name: "Non-Compatible", value: stats.nonCompatible, color: "hsl(0, 72%, 50%)" },
  ];

  const riskData = [
    { name: "Low Risk", value: stats.lowRisk, color: "hsl(145, 65%, 40%)" },
    { name: "High Risk", value: stats.highRisk, color: "hsl(38, 92%, 50%)" },
  ];

  const monthlyData = [
    { month: "Jan", predictions: 89 },
    { month: "Feb", predictions: 102 },
    { month: "Mar", predictions: 134 },
    { month: "Apr", predictions: 98 },
    { month: "May", predictions: 156 },
    { month: "Jun", predictions: 178 },
    { month: "Jul", predictions: 145 },
    { month: "Aug", predictions: 167 },
    { month: "Sep", predictions: 178 },
  ];

  const chartConfig = {
    predictions: {
      label: "Predictions",
      color: "hsl(175, 70%, 35%)",
    },
  };

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
                <p className="text-xs sm:text-sm text-muted-foreground">Total Predictions</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                  {stats.totalPredictions.toLocaleString()}
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
                <p className="text-xs sm:text-sm text-muted-foreground">Compatible Results</p>
                <p className="text-xl sm:text-2xl font-bold text-[hsl(145,65%,40%)] mt-1">
                  {stats.compatible.toLocaleString()}
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
                <p className="text-xs sm:text-sm text-muted-foreground">Non-Compatible</p>
                <p className="text-xl sm:text-2xl font-bold text-destructive mt-1">
                  {stats.nonCompatible.toLocaleString()}
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
                <p className="text-xs sm:text-sm text-muted-foreground">Total Visitors</p>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Compatibility Distribution */}
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {compatibilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Level Distribution */}
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Predictions Chart */}
      <Card className="border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Monthly Prediction Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={monthlyData}>
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(215, 15%, 45%)", fontSize: 12 }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(215, 15%, 45%)", fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="predictions" 
                fill="hsl(175, 70%, 35%)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

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
                  {stats.databaseSize.toLocaleString()} compounds
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
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                <p className="text-xl font-bold text-foreground">
                  87.3%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Analytics;
