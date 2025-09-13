import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: "Hindi" | "English";
}

const Chatbot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "नमस्ते! मैं आपका AI असिस्टेंट हूं। मैं हिंदी और English दोनों में आपकी मदद कर सकता हूं। आप certificates, scholarships, या fees के बारे में पूछ सकते हैं।",
      isUser: false,
      timestamp: new Date(),
      language: "Hindi"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock FAQ responses with multilingual support
  const faqResponses = {
    // Certificate related
    "certificate": {
      hindi: "आपका certificate status check करने के लिए, मुझे बताएं कि आपने कौन सा certificate upload किया था? Hackathon, Internship, या MOOC?",
      english: "To check your certificate status, please tell me which certificate you uploaded - Hackathon, Internship, or MOOC?"
    },
    "hackathon": {
      hindi: "आपका hackathon certificate currently pending में है। Faculty review के बाद 24-48 घंटे में decision आ जाएगा।",
      english: "Your hackathon certificate is currently pending. You'll get the decision within 24-48 hours after faculty review."
    },
    "internship": {
      hindi: "Internship certificate approved हो गया है! आप अपने portfolio में check कर सकते हैं।",
      english: "Your internship certificate has been approved! You can check it in your portfolio section."
    },
    "mooc": {
      hindi: "MOOC certificate की verification process चल रही है। 2-3 दिन में update मिलेगा।",
      english: "MOOC certificate verification is in progress. You'll get an update within 2-3 days."
    },
    
    // General FAQs
    "scholarship": {
      hindi: "Scholarship application की last date 31 March 2024 है। आप student portal के 'Scholarships' section से apply कर सकते हैं।",
      english: "Scholarship application deadline is March 31st, 2024. You can apply through the student portal's 'Scholarships' section."
    },
    "fee": {
      hindi: "अगली semester fee payment की last date 25 January 2024 है। Online या offline दोनों तरीकों से payment कर सकते हैं।",
      english: "Next semester fee payment deadline is January 25th, 2024. You can pay both online or offline."
    },
    "upload": {
      hindi: "Certificate upload करने के लिए 'Student Uploads' section में जाएं, category select करें, और PDF file upload करें (max 5MB)।",
      english: "To upload certificates, go to 'Student Uploads' section, select category, and upload PDF file (max 5MB)."
    },
    "naac": {
      hindi: "हमारा college NAAC से A++ grade में accredited है। यह quality और standards का प्रमाण है।",
      english: "Our college is accredited with A++ grade by NAAC. This is proof of our quality and standards."
    }
  };

  const detectLanguage = (text: string): "Hindi" | "English" => {
    // Simple language detection based on Devanagari script
    const hindiRegex = /[\u0900-\u097F]/;
    return hindiRegex.test(text) ? "Hindi" : "English";
  };

  const generateResponse = (userMessage: string, language: "Hindi" | "English"): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords and return appropriate response
    for (const [keyword, responses] of Object.entries(faqResponses)) {
      if (lowerMessage.includes(keyword)) {
        return language === "Hindi" ? responses.hindi : responses.english;
      }
    }
    
    // Default responses
    if (language === "Hindi") {
      return "मुझे खुशी होगी आपकी मदद करने में! आप certificates, scholarships, fees, या college information के बारे में पूछ सकते हैं। अगर आपका कोई specific question है तो बताएं।";
    } else {
      return "I'd be happy to help you! You can ask about certificates, scholarships, fees, or college information. Please feel free to ask your specific question.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userLanguage = detectLanguage(inputMessage);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
      language: userLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateResponse(inputMessage, userLanguage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
        language: userLanguage
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      toast({
        title: "Message sent",
        description: "AI assistant responded to your query",
      });
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 gradient-primary"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 shadow-xl border-border transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[32rem]'
    }`}>
      <CardHeader className="pb-3 border-b border-border gradient-primary text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Assistant
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 w-8 h-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {!isMinimized && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              हिंदी + English
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Live Chat
            </Badge>
          </div>
        )}
      </CardHeader>
      
      {!isMinimized && (
        <>
          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {message.isUser ? (
                        <User className="w-3 h-3" />
                      ) : (
                        <Bot className="w-3 h-3" />
                      )}
                      <span className="text-xs">
                        {message.isUser ? 'You' : 'AI Assistant'}
                      </span>
                      <Badge variant="outline" className="text-xs ml-1">
                        {message.language === 'Hindi' ? 'हि' : 'EN'}
                      </Badge>
                    </div>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Bot className="w-3 h-3" />
                      <span className="text-xs">AI Assistant is typing...</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type in Hindi or English..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Ask about certificates, scholarships, fees, or college info
            </p>
          </div>
        </>
      )}
    </Card>
  );
};

export { Chatbot };