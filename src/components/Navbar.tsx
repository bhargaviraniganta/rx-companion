import React, { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X, FlaskConical, Database, BarChart3, BookOpen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "About Project", path: "/", icon: Info },
  { title: "Prediction Tool", path: "/predict", icon: FlaskConical },
  { title: "Database Viewer", path: "/database", icon: Database },
  { title: "Analytics", path: "/analytics", icon: BarChart3 },
  { title: "References", path: "/references", icon: BookOpen },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <FlaskConical className="h-6 w-6" />
            <span className="hidden sm:inline">DrugExciPredict</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                activeClassName="text-primary bg-accent"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  activeClassName="text-primary bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
