import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, Filter, Calendar, TrendingUp, Users, Bot } from "lucide-react";

interface ChatLog {
  id: string;
  timestamp: string;
  userQuery: string;
  botResponse: string;
  language: "Hindi" | "English";
  category: "FAQ" | "Certificate Status" | "General" | "Support";
  resolved: boolean;
  userId?: string;
  userName?: string;
}

const ChatbotLogs = () => {
  const [logs] = useState<ChatLog[]>([
    {
      id: "1",
      timestamp: "2024-01-15 10:30:00",
      userQuery: "मेरा certificate approve हो गया क्या?",
      botResponse: "आपका hackathon certificate अभी pending में है। Faculty review के बाद 24-48 घंटे में decision आ जाएगा।",
      language: "Hindi",
      category: "Certificate Status",
      resolved: true,
      userId: "21CS001",
      userName: "Rahul Sharma"
    },
    {
      id: "2", 
      timestamp: "2024-01-15 11:15:00",
      userQuery: "What is the deadline for scholarship applications?",
      botResponse: "The scholarship application deadline is March 31st, 2024. You can apply through the student portal under 'Scholarships' section.",
      language: "English",
      category: "FAQ",
      resolved: true,
      userId: "21CS002",
      userName: "Priya Singh"
    },
    {
      id: "3",
      timestamp: "2024-01-15 12:00:00", 
      userQuery: "Fee payment कब तक करना है?",
      botResponse: "अगली semester fee payment की last date 25 January 2024 है। आप online या offline दोनों तरीकों से payment कर सकते हैं।",
      language: "Hindi",
      category: "FAQ",
      resolved: true,
      userId: "21CS003",
      userName: "Amit Kumar"
    },
    {
      id: "4",
      timestamp: "2024-01-15 14:30:00",
      userQuery: "How can I upload my internship certificate?",
      botResponse: "Go to 'Student Uploads' section, select 'Internship' category, and upload your certificate in PDF format. Make sure it's under 5MB.",
      language: "English", 
      category: "General",
      resolved: true,
      userId: "21CS004",
      userName: "Neha Patel"
    },
    {
      id: "5",
      timestamp: "2024-01-15 16:45:00",
      userQuery: "NAAC accreditation के बारे में बताओ",
      botResponse: "हमारा college NAAC से A++ grade में accredited है। यह quality और standards का प्रमाण है।",
      language: "Hindi",
      category: "FAQ", 
      resolved: true,
      userId: "21CS005",
      userName: "Rohit Verma"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  const categories = ["All", "FAQ", "Certificate Status", "General", "Support"];
  const languages = ["All", "Hindi", "English"];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userQuery.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.botResponse.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (log.userName && log.userName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || log.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "All" || log.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      "FAQ": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Certificate Status": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "General": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Support": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getLanguageBadge = (language: string) => {
    return language === "Hindi" 
      ? <Badge variant="outline" className="text-accent border-accent">हिंदी</Badge>
      : <Badge variant="outline" className="text-primary border-primary">EN</Badge>;
  };

  // Statistics
  const totalQueries = logs.length;
  const resolvedQueries = logs.filter(log => log.resolved).length;
  const hindiQueries = logs.filter(log => log.language === "Hindi").length;
  const englishQueries = logs.filter(log => log.language === "English").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chatbot Logs</h1>
          <p className="text-muted-foreground">Monitor multilingual chatbot interactions and performance</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Bot className="w-3 h-3" />
          AI Assistant Active
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Queries</p>
                <p className="text-2xl font-bold text-foreground">{totalQueries}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +24% today
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-success">{resolvedQueries}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((resolvedQueries / totalQueries) * 100).toFixed(1)}% success rate
                </p>
              </div>
              <Bot className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hindi Queries</p>
                <p className="text-2xl font-bold text-accent">{hindiQueries}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((hindiQueries / totalQueries) * 100).toFixed(1)}% of total
                </p>
              </div>
              <Users className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">English Queries</p>
                <p className="text-2xl font-bold text-primary">{englishQueries}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((englishQueries / totalQueries) * 100).toFixed(1)}% of total
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search Queries</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <div className="flex flex-wrap gap-1">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Language</label>
              <div className="flex flex-wrap gap-1">
                {languages.map(language => (
                  <Button
                    key={language}
                    variant={selectedLanguage === language ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Logs */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Conversation History ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="border border-border rounded-lg p-6 hover:shadow-soft transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                    </div>
                    {log.userName && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{log.userName}</span>
                        <Badge variant="outline" className="text-xs">{log.userId}</Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getLanguageBadge(log.language)}
                    <Badge className={getCategoryColor(log.category)} variant="secondary">
                      {log.category}
                    </Badge>
                    {log.resolved && (
                      <Badge className="bg-success text-success-foreground">
                        Resolved
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1">User Query:</div>
                    <div className="text-foreground">{log.userQuery}</div>
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                      <Bot className="w-3 h-3" />
                      Bot Response:
                    </div>
                    <div className="text-foreground">{log.botResponse}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground">No conversations found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotLogs;