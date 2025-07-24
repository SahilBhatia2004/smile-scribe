import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface PatientInfo {
  name: string;
  phone: string;
}

const DENTAL_FAQS = {
  "hours": "We're open Monday-Friday 8AM-6PM, Saturday 9AM-4PM. Closed Sundays.",
  "services": "We offer general dentistry, cosmetic procedures, orthodontics, oral surgery, and emergency care.",
  "insurance": "We accept most major insurance plans. Please call to verify your specific coverage.",
  "emergency": "For dental emergencies, call our 24/7 hotline or visit our emergency page.",
  "location": "We're located at 123 Dental Way, Health City. Free parking available.",
  "pricing": "Prices vary by service. Cleanings start at $120, fillings from $150. We offer payment plans."
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your dental assistant. I can help answer questions about our clinic and book appointments. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: "", phone: "" });
  const [bookingStep, setBookingStep] = useState<'none' | 'collecting_info' | 'scheduling'>('none');

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleFAQ = (userMessage: string): string | null => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hour') || message.includes('time') || message.includes('open')) {
      return DENTAL_FAQS.hours;
    }
    if (message.includes('service') || message.includes('treatment')) {
      return DENTAL_FAQS.services;
    }
    if (message.includes('insurance') || message.includes('coverage')) {
      return DENTAL_FAQS.insurance;
    }
    if (message.includes('emergency') || message.includes('urgent')) {
      return DENTAL_FAQS.emergency;
    }
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return DENTAL_FAQS.location;
    }
    if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
      return DENTAL_FAQS.pricing;
    }
    if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
      return "I'd be happy to help you book an appointment! First, I'll need to collect some information.";
    }
    
    return null;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    
    // Handle different conversation flows
    if (bookingStep === 'none') {
      const faqResponse = handleFAQ(inputValue);
      if (faqResponse) {
        setTimeout(() => {
          addMessage(faqResponse, 'bot');
          if (inputValue.toLowerCase().includes('appointment') || inputValue.toLowerCase().includes('book')) {
            setBookingStep('collecting_info');
            setTimeout(() => {
              addMessage("To get started, please provide your full name:", 'bot');
            }, 1000);
          }
        }, 500);
      } else {
        setTimeout(() => {
          addMessage("I can help you with information about our clinic hours, services, insurance, pricing, location, or booking appointments. What would you like to know?", 'bot');
        }, 500);
      }
    } else if (bookingStep === 'collecting_info') {
      if (!patientInfo.name) {
        setPatientInfo(prev => ({ ...prev, name: inputValue }));
        setTimeout(() => {
          addMessage(`Thank you, ${inputValue}! Now, please provide your phone number:`, 'bot');
        }, 500);
      } else if (!patientInfo.phone) {
        setPatientInfo(prev => ({ ...prev, phone: inputValue }));
        setBookingStep('scheduling');
        setTimeout(() => {
          addMessage("Perfect! Now I'll help you schedule your appointment. What date and time would you prefer? (Note: This demo shows the booking flow - in a real implementation, this would integrate with Cal.com API)", 'bot');
        }, 500);
      }
    } else if (bookingStep === 'scheduling') {
      setTimeout(() => {
        addMessage(`Great! I've scheduled your appointment for ${inputValue}. Here's your confirmation:

📋 **Appointment Confirmed**
👤 Name: ${patientInfo.name}
📞 Phone: ${patientInfo.phone}
📅 Date & Time: ${inputValue}

Thank you for booking with SmileCare Dental! We'll send you a reminder 24 hours before your appointment.`, 'bot');
        
        // Reset booking flow
        setBookingStep('none');
        setPatientInfo({ name: "", phone: "" });
      }, 500);
    }

    setInputValue("");
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-medical-blue to-trust-blue hover:scale-105 transition-transform"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl border-0" style={{boxShadow: 'var(--shadow-medical)'}}>
          <CardHeader className="bg-gradient-to-r from-medical-blue to-trust-blue text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5" />
                SmileCare Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[400px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-medical-blue' : 'bg-accent'}`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-medical-blue" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg whitespace-pre-line ${
                        message.sender === 'user'
                          ? 'bg-medical-blue text-white'
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-medical-blue hover:bg-trust-blue"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};