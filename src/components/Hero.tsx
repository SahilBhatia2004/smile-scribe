import { Button } from "@/components/ui/button";
import { Calendar, Phone, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/dental-hero.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern dental clinic interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Smile is Our
            <span className="text-medical-blue-light"> Priority</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Experience exceptional dental care with our AI-powered patient assistant. 
            Get instant answers to your questions and book appointments seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-medical-blue to-trust-blue hover:scale-105 transition-transform text-lg px-8 py-6"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-medical-blue text-lg px-8 py-6"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-medical-blue-light" />
              <span>Open 7 Days a Week</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-medical-blue-light" />
              <span>Downtown Location</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};