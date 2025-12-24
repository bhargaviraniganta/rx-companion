import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import About from "./pages/About";
import PredictionTool from "./pages/PredictionTool";
import DatabaseViewer from "./pages/DatabaseViewer";
import Analytics from "./pages/Analytics";
import References from "./pages/References";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/predict" element={<PredictionTool />} />
            <Route path="/database" element={<DatabaseViewer />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/references" element={<References />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
