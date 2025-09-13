import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Share2, Award, Calendar, ExternalLink, Search } from "lucide-react";
import QRCode from 'qrcode';

interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  issuer: string;
  verified: boolean;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  year: string;
  email: string;
  achievements: Achievement[];
}

const Portfolio = () => {
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "Rahul Sharma",
      rollNumber: "21CS001",
      department: "Computer Science",
      year: "3rd Year",
      email: "rahul.sharma@college.edu",
      achievements: [
        {
          id: "a1",
          title: "National Hackathon Winner",
          category: "Hackathon",
          date: "2024-01-15",
          description: "First prize in Smart India Hackathon 2024",
          issuer: "Government of India",
          verified: true
        },
        {
          id: "a2", 
          title: "Machine Learning Certification",
          category: "MOOC",
          date: "2024-01-10",
          description: "Completed Advanced ML course by Stanford University",
          issuer: "Coursera",
          verified: true
        }
      ]
    },
    {
      id: "2",
      name: "Priya Singh", 
      rollNumber: "21CS002",
      department: "Computer Science",
      year: "3rd Year",
      email: "priya.singh@college.edu",
      achievements: [
        {
          id: "a3",
          title: "Tech Internship Completion",
          category: "Internship", 
          date: "2024-01-12",
          description: "6-month internship at Microsoft India",
          issuer: "Microsoft Corporation",
          verified: true
        }
      ]
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    generateQRCode();
  }, [selectedStudent]);

  const generateQRCode = async () => {
    try {
      const portfolioUrl = `${window.location.origin}/portfolio/${selectedStudent.id}`;
      const qrDataUrl = await QRCode.toDataURL(portfolioUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Hackathon": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Internship": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "MOOC": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Volunteering": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const sharePortfolio = async () => {
    const portfolioUrl = `${window.location.origin}/portfolio/${selectedStudent.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${selectedStudent.name}'s Digital Portfolio`,
          text: `Check out ${selectedStudent.name}'s verified achievements and certificates`,
          url: portfolioUrl
        });
      } catch (err) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(portfolioUrl);
      }
    } else {
      navigator.clipboard.writeText(portfolioUrl);
    }
  };

  const downloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `${selectedStudent.name}_QR_Code.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Digital Portfolio</h1>
          <p className="text-muted-foreground">Student achievement portfolios with QR code sharing</p>
        </div>
        <Button onClick={sharePortfolio} className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Portfolio
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Selection */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Select Student
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedStudent.id === student.id
                      ? "bg-primary/10 border border-primary"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="font-medium text-foreground">{student.name}</div>
                  <div className="text-sm text-muted-foreground">{student.rollNumber}</div>
                  <div className="text-xs text-muted-foreground">{student.department}</div>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {student.achievements.length} achievements
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Details */}
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{selectedStudent.name}</CardTitle>
                <div className="text-sm text-muted-foreground space-y-1 mt-2">
                  <p>Roll No: {selectedStudent.rollNumber}</p>
                  <p>Department: {selectedStudent.department}</p>
                  <p>Year: {selectedStudent.year}</p>
                  <p>Email: {selectedStudent.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-success text-success-foreground">
                  Verified Profile
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Verified Achievements ({selectedStudent.achievements.length})
                </h3>
                
                <div className="space-y-3">
                  {selectedStudent.achievements.map((achievement) => (
                    <div key={achievement.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-foreground">{achievement.title}</h4>
                        <Badge className={getCategoryColor(achievement.category)} variant="secondary">
                          {achievement.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {achievement.date}
                          </span>
                          <span>Issued by: {achievement.issuer}</span>
                        </div>
                        
                        {achievement.verified && (
                          <Badge variant="outline" className="text-success border-success">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {qrCodeUrl && (
              <div className="flex justify-center">
                <img src={qrCodeUrl} alt="Portfolio QR Code" className="border rounded-lg" />
              </div>
            )}
            
            <div>
              <h4 className="font-medium text-foreground mb-2">Scan to view {selectedStudent.name}'s Portfolio</h4>
              <p className="text-sm text-muted-foreground mb-4">
                This QR code links directly to the student's verified digital portfolio
              </p>
              
              <div className="flex gap-2 justify-center">
                <Button onClick={downloadQR} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download QR
                </Button>
                <Button onClick={sharePortfolio} size="sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open Portfolio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Portfolio Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{selectedStudent.achievements.length}</div>
                  <div className="text-sm text-muted-foreground">Total Achievements</div>
                </div>
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    {selectedStudent.achievements.filter(a => a.verified).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Verified</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Categories Breakdown</h4>
                {Object.entries(
                  selectedStudent.achievements.reduce((acc, achievement) => {
                    acc[achievement.category] = (acc[achievement.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{category}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;