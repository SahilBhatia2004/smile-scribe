import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import logoImage from "@/assets/dental-logo.jpg";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50" style={{boxShadow: 'var(--shadow-soft)'}}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="SmileCare Dental Logo" 
              className="h-10 w-10 rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-medical-blue">SmileCare Dental</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Patient Care</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground hover:text-medical-blue transition-colors">Services</a>
            <a href="#about" className="text-foreground hover:text-medical-blue transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-medical-blue transition-colors">Contact</a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Phone className="h-4 w-4 mr-2" />
              (555) 123-DENTAL
            </Button>
            <Button size="sm" className="bg-medical-blue hover:bg-trust-blue">
              <Calendar className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};