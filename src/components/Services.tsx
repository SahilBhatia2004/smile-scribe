import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Shield, Sparkles, Stethoscope, Clock, Award } from "lucide-react";

const services = [
  {
    icon: <Smile className="h-8 w-8 text-medical-blue" />,
    title: "General Dentistry",
    description: "Comprehensive oral health care including cleanings, fillings, and preventive treatments."
  },
  {
    icon: <Sparkles className="h-8 w-8 text-medical-blue" />,
    title: "Cosmetic Procedures",
    description: "Teeth whitening, veneers, and smile makeovers to enhance your natural beauty."
  },
  {
    icon: <Shield className="h-8 w-8 text-medical-blue" />,
    title: "Orthodontics",
    description: "Braces and clear aligners to straighten teeth and correct bite issues."
  },
  {
    icon: <Stethoscope className="h-8 w-8 text-medical-blue" />,
    title: "Oral Surgery",
    description: "Tooth extractions, wisdom teeth removal, and advanced surgical procedures."
  },
  {
    icon: <Clock className="h-8 w-8 text-medical-blue" />,
    title: "Emergency Care",
    description: "24/7 emergency dental services for urgent dental problems and pain relief."
  },
  {
    icon: <Award className="h-8 w-8 text-medical-blue" />,
    title: "AI Assistant",
    description: "Our intelligent chatbot provides instant answers and seamless appointment booking."
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-accent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comprehensive Dental Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From routine cleanings to complex procedures, our AI-enhanced practice 
            delivers exceptional care with modern technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0"
              style={{boxShadow: 'var(--shadow-soft)'}}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-accent rounded-full w-fit">
                  {service.icon}
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};