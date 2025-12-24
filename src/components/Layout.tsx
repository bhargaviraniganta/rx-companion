import React from "react";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
};

export default Layout;
