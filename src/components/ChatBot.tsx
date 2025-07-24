import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, User, Bot, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const GOOGLE_PALM_API_KEY = "AIzaSyDxe6u625YQmOi6UKUNxpav-Szvx6hfoxM";
const CAL_COM_USERNAME = "sahilbhatia2004";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your dental assistant powered by AI. I can answer questions about our clinic and help you book appointments. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const callGooglePalmAPI = async (prompt: string): Promise<string> => {
    try {
      console.log('Making API call to Google AI...');
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_PALM_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful dental clinic assistant. Answer questions about dental services, clinic hours, pricing, and help with appointment booking. Keep responses professional and concise.

Clinic Information:
- Hours: Monday-Friday 8AM-6PM, Saturday 9AM-4PM, Closed Sundays
- Services: General dentistry, cosmetic procedures, orthodontics, oral surgery, emergency care
- Location: 123 Dental Way, Health City
- Phone: (555) 123-DENTAL
- Insurance: Most major plans accepted
- Emergency: 24/7 hotline available

User question: ${prompt}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request. Please try again.";
    } catch (error) {
      console.error('Error calling Google AI API:', error);
      
      // Fallback to simple FAQ responses if API fails
      return getSimpleFAQResponse(prompt);
    }
  };

  const getSimpleFAQResponse = (prompt: string): string => {
    const message = prompt.toLowerCase();
    
    if (message.includes('hour') || message.includes('time') || message.includes('open')) {
      return "We're open Monday-Friday 8AM-6PM, Saturday 9AM-4PM. Closed Sundays.";
    }
    if (message.includes('service') || message.includes('treatment')) {
      return "We offer general dentistry, cosmetic procedures, orthodontics, oral surgery, and emergency care.";
    }
    if (message.includes('insurance') || message.includes('coverage')) {
      return "We accept most major insurance plans. Please call to verify your specific coverage.";
    }
    if (message.includes('emergency') || message.includes('urgent')) {
      return "For dental emergencies, call our 24/7 hotline or visit our emergency page.";
    }
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return "We're located at 123 Dental Way, Health City. Free parking available.";
    }
    if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
      return "Prices vary by service. Cleanings start at $120, fillings from $150. We offer payment plans.";
    }
    
    return "I can help you with information about our clinic hours, services, insurance, pricing, location, or booking appointments. What would you like to know?";
  };

  const checkCalcomAvailability = async () => {
    try {
      // Note: Cal.com API requires authentication for availability checking
      // This is a demo implementation - in production, you'd need proper API setup
      const response = await fetch(`https://api.cal.com/v1/availability?username=${CAL_COM_USERNAME}`, {
        headers: {
          'Authorization': 'Bearer YOUR_CAL_COM_API_KEY', // Would need proper API key
        }
      });
      
      if (!response.ok) {
        throw new Error('API call failed');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Cal.com API error:', error);
      // Fallback to direct booking link
      return null;
    }
  };

  const handleBookingRequest = async () => {
    const availability = await checkCalcomAvailability();
    
    if (availability) {
      // If we can get availability data, show available slots
      return "I can see available appointment slots. Let me show you the options...";
    } else {
      // Fallback to direct Cal.com link
      return `I'd be happy to help you book an appointment! Please click this link to see available times and book directly: https://cal.com/${CAL_COM_USERNAME}/appointment

You can choose from available slots and the booking will be confirmed automatically. Is there anything specific you'd like to know about the appointment process?`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    console.log('Sending message:', inputValue);
    
    const userMessage = inputValue;
    addMessage(userMessage, 'user');
    setInputValue("");
    setIsLoading(true);

    try {
      // Check if user wants to book an appointment
      if (userMessage.toLowerCase().includes('book') || 
          userMessage.toLowerCase().includes('appointment') || 
          userMessage.toLowerCase().includes('schedule')) {
        console.log('Handling booking request...');
        const bookingResponse = await handleBookingRequest();
        addMessage(bookingResponse, 'bot');
      } else {
        // Use Google AI API for general questions
        console.log('Calling Google AI API...');
        const aiResponse = await callGooglePalmAPI(userMessage);
        addMessage(aiResponse, 'bot');
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      addMessage("I apologize for the technical issue. Please try again or call our clinic at (555) 123-DENTAL.", 'bot');
    } finally {
      setIsLoading(false);
    }
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
        <Card className="fixed bottom-24 right-6 w-96 h-[600px] shadow-2xl border-0" style={{boxShadow: 'var(--shadow-medical)'}}>
          <CardHeader className="bg-gradient-to-r from-medical-blue to-trust-blue text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5" />
                SmileCare AI Assistant
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
          
          <CardContent className="p-0 flex flex-col h-[500px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
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
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <div className="p-2 rounded-full bg-accent">
                      <Bot className="h-4 w-4 text-medical-blue" />
                    </div>
                    <div className="p-3 rounded-lg bg-accent text-accent-foreground flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about our services or book an appointment..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-medical-blue hover:bg-trust-blue"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Powered by Google AI • Cal.com Integration
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};