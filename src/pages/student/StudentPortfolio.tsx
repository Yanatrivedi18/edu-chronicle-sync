import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Share, Eye, Award, Calendar, User, ExternalLink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import QRCode from 'qrcode';

const StudentPortfolio = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const achievements = [
    {
      id: 1,
      title: "Machine Learning Specialization",
      category: "MOOC",
      issuer: "Coursera - Stanford University",
      date: "2024-01-15",
      status: "approved",
      description: "Completed comprehensive ML course covering supervised and unsupervised learning."
    },
    {
      id: 2,
      title: "Smart India Hackathon Winner",
      category: "Hackathon",
      issuer: "Government of India",
      date: "2024-01-10",
      status: "approved",
      description: "First prize winner in Healthcare theme, developed AI-powered diagnostic tool."
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      category: "Internship",
      issuer: "Tech Solutions Pvt Ltd",
      date: "2023-12-20",
      status: "approved",
      description: "6-month internship focusing on React, Node.js, and cloud deployment."
    },
    {
      id: 4,
      title: "Blood Donation Camp Volunteer",
      category: "Volunteering",
      issuer: "Red Cross Society",
      date: "2023-11-15",
      status: "approved",
      description: "Organized and coordinated blood donation drive, collected 200+ units."
    },
    {
      id: 5,
      title: "AWS Cloud Practitioner",
      category: "MOOC",
      issuer: "Amazon Web Services",
      date: "2023-10-05",
      status: "approved",
      description: "Certified in AWS cloud fundamentals and core services."
    }
  ];

  const generateQRCode = async () => {
    try {
      const portfolioUrl = `https://sih-activity-hub.com/portfolio/${user?.id}`;
      const qrDataUrl = await QRCode.toDataURL(portfolioUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrDataUrl);
      
      toast({
        title: "QR Code Generated!",
        description: "Your portfolio QR code is ready to share",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `${user?.name}-portfolio-qr.png`;
      link.href = qrCodeUrl;
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "QR code saved to your device",
      });
    }
  };

  const sharePortfolio = async () => {
    const portfolioUrl = `https://sih-activity-hub.com/portfolio/${user?.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user?.name}'s Digital Portfolio`,
          text: 'Check out my verified achievements and certificates',
          url: portfolioUrl,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(portfolioUrl);
        toast({
          title: "Link Copied!",
          description: "Portfolio link copied to clipboard",
        });
      }
    } else {
      navigator.clipboard.writeText(portfolioUrl);
      toast({
        title: "Link Copied!",
        description: "Portfolio link copied to clipboard",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Hackathon": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Internship": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Volunteering": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "MOOC": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Digital Portfolio</h1>
          <p className="text-muted-foreground">Your verified achievements and certificates</p>
        </div>
        <Badge variant="secondary" className="animate-bounce-gentle">
          {achievements.length} Verified
        </Badge>
      </div>

      {/* Portfolio Header */}
      <Card className="border-border gradient-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-white/80">{user?.email}</p>
                <p className="text-white/60">Student at College Name</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={generateQRCode}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={sharePortfolio}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Display */}
      {qrCodeUrl && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Portfolio QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <img src={qrCodeUrl} alt="Portfolio QR Code" className="border rounded-lg" />
            <div className="flex gap-2">
              <Button onClick={downloadQRCode} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download QR
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open(`https://sih-activity-hub.com/portfolio/${user?.id}`, '_blank')}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Preview Public
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="border-border hover-lift">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <Badge className={getCategoryColor(achievement.category)} variant="secondary">
                    {achievement.category}
                  </Badge>
                </div>
                <Badge className="bg-success text-success-foreground">
                  <Award className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-3 h-3" />
                  {achievement.issuer}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {achievement.date}
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View Certificate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{achievements.length}</div>
            <div className="text-sm text-muted-foreground">Total Achievements</div>
          </CardContent>
        </Card>
        
        <Card className="border-border text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{achievements.filter(a => a.category === 'MOOC').length}</div>
            <div className="text-sm text-muted-foreground">Online Courses</div>
          </CardContent>
        </Card>
        
        <Card className="border-border text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{achievements.filter(a => a.category === 'Hackathon').length}</div>
            <div className="text-sm text-muted-foreground">Hackathons</div>
          </CardContent>
        </Card>
        
        <Card className="border-border text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{achievements.filter(a => a.category === 'Volunteering').length}</div>
            <div className="text-sm text-muted-foreground">Volunteer Work</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPortfolio;