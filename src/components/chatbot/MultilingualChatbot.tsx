import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Minimize2, Maximize2, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language: 'en' | 'hi';
}

const MultilingualChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // FAQ responses in both languages
  const faqResponses = {
    en: {
      scholarship: "The next scholarship application deadline is March 15, 2024. You can apply through the student portal under 'Financial Aid' section.",
      fees: "Fee payment deadline for this semester is February 28, 2024. You can pay online through the student portal or visit the accounts office.",
      certificates: "Your certificate approval status can be checked in the 'My Uploads' section. Approved certificates will show a green 'Approved' badge.",
      portfolio: "You can generate your digital portfolio QR code from the 'Portfolio' section. This creates a shareable link to your verified achievements.",
      grades: "Grade results will be published on March 1, 2024. You will receive an email notification when grades are available.",
      library: "Library hours are 8:00 AM to 8:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends. You can renew books online through the library portal.",
      default: "I'm here to help! You can ask me about scholarships, fee deadlines, certificate status, portfolio generation, grades, or library hours."
    },
    hi: {
      scholarship: "अगली छात्रवृत्ति आवेदन की अंतिम तिथि 15 मार्च, 2024 है। आप छात्र पोर्टल के 'वित्तीय सहायता' अनुभाग के माध्यम से आवेदन कर सकते हैं।",
      fees: "इस सेमेस्टर के लिए फीस भुगतान की अंतिम तिथि 28 फरवरी, 2024 है। आप छात्र पोर्टल के माध्यम से ऑनलाइन भुगतान कर सकते हैं या खाता कार्यालय जा सकते हैं।",
      certificates: "आपके प्रमाणपत्र की अनुमोदन स्थिति 'मेरे अपलोड' अनुभाग में देखी जा सकती है। अनुमोदित प्रमाणपत्रों में हरा 'अनुमोदित' बैज दिखेगा।",
      portfolio: "आप 'पोर्टफोलियो' अनुभाग से अपना डिजिटल पोर्टफोलियो QR कोड जेनरेट कर सकते हैं। यह आपकी सत्यापित उपलब्धियों का एक साझा करने योग्य लिंक बनाता है।",
      grades: "ग्रेड परिणाम 1 मार्च, 2024 को प्रकाशित होंगे। ग्रेड उपलब्ध होने पर आपको ईमेल अधिसूचना मिलेगी।",
      library: "पुस्तकालय का समय सप्ताह के दिनों में सुबह 8:00 बजे से शाम 8:00 बजे तक और सप्ताहांत में सुबह 9:00 बजे से शाम 6:00 बजे तक है। आप पुस्तकालय पोर्टल के माध्यम से ऑनलाइन पुस्तकों का नवीनीकरण कर सकते हैं।",
      default: "मैं यहाँ मदद के लिए हूँ! आप मुझसे छात्रवृत्ति, फीस की अंतिम तिथि, प्रमाणपत्र की स्थिति, पोर्टफोलियो जेनरेशन, ग्रेड, या पुस्तकालय के घंटों के बारे में पूछ सकते हैं।"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string, lang: 'en' | 'hi') => {
    const msg = userMessage.toLowerCase();
    const responses = faqResponses[lang];
    
    // Check for certificate status queries
    if (msg.includes('certificate') || msg.includes('approval') || msg.includes('status') || 
        msg.includes('प्रमाणपत्र') || msg.includes('अनुमोदन') || msg.includes('स्थिति')) {
      
      // Mock certificate status check
      const hasApproved = Math.random() > 0.5;
      if (lang === 'hi') {
        return hasApproved 
          ? `${user?.name}, आपके 2 प्रमाणपत्र अनुमोदित हैं और 1 समीक्षाधीन है। आप अपने पोर्टफोलियो में विवरण देख सकते हैं।`
          : `${user?.name}, आपके सभी प्रमाणपत्र वर्तमान में समीक्षाधीन हैं। कृपया 24-48 घंटे प्रतीक्षा करें।`;
      } else {
        return hasApproved 
          ? `${user?.name}, you have 2 approved certificates and 1 pending review. You can view details in your portfolio.`
          : `${user?.name}, all your certificates are currently under review. Please wait 24-48 hours for approval.`;
      }
    }
    
    // Check for other FAQ topics
    if (msg.includes('scholarship') || msg.includes('छात्रवृत्ति')) return responses.scholarship;
    if (msg.includes('fee') || msg.includes('payment') || msg.includes('फीस') || msg.includes('भुगतान')) return responses.fees;
    if (msg.includes('portfolio') || msg.includes('qr') || msg.includes('पोर्टफोलियो')) return responses.portfolio;
    if (msg.includes('grade') || msg.includes('result') || msg.includes('ग्रेड') || msg.includes('परिणाम')) return responses.grades;
    if (msg.includes('library') || msg.includes('book') || msg.includes('पुस्तकालय') || msg.includes('किताब')) return responses.library;
    
    // Default response
    return responses.default;
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(message, language),
        sender: 'bot',
        timestamp: new Date(),
        language
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: language === 'hi' ? "चैट साफ़ हो गई" : "Chat cleared",
      description: language === 'hi' ? "सभी संदेश हटा दिए गए हैं" : "All messages have been cleared",
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-elegant z-50 gradient-primary"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 shadow-elegant z-50 border-border ${
      isMinimized ? 'h-16' : 'h-[32rem]'
    } transition-all duration-300`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">SIH Assistant</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {language === 'hi' ? 'हिंदी' : 'English'}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(lang => lang === 'en' ? 'hi' : 'en')}
              className="text-xs"
            >
              <Languages className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-full pb-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-80">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                {language === 'hi' 
                  ? "नमस्ते! मैं आपकी सहायता के लिए यहाँ हूँ। आप मुझसे छात्रवृत्ति, फीस, प्रमाणपत्र की स्थिति के बारे में पूछ सकते हैं।"
                  : "Hello! I'm here to help. You can ask me about scholarships, fees, certificate status, and more."
                }
              </div>
            )}
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'hi' ? "अपना संदेश लिखें..." : "Type your message..."}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="mt-2 text-xs text-muted-foreground"
            >
              {language === 'hi' ? 'चैट साफ़ करें' : 'Clear Chat'}
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default MultilingualChatbot;