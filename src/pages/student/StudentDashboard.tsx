import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, Award, Clock, TrendingUp, FileCheck, AlertCircle, Eye, QrCode } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const studentStats = {
    totalUploads: 8,
    approvedCertificates: 5,
    pendingApprovals: 2,
    rejectedSubmissions: 1
  };

  const recentUploads = [
    { id: 1, title: "Machine Learning Certificate", category: "MOOC", status: "approved", date: "2024-01-15" },
    { id: 2, title: "Hackathon Winner Certificate", category: "Hackathon", status: "approved", date: "2024-01-14" },
    { id: 3, title: "Internship Completion", category: "Internship", status: "pending", date: "2024-01-13" },
    { id: 4, title: "Blood Donation Certificate", category: "Volunteering", status: "pending", date: "2024-01-12" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Track your achievements and certificates</p>
        </div>
        <Badge variant="secondary" className="animate-bounce-gentle">
          Student Portal
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{studentStats.totalUploads}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              All time submissions
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Award className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{studentStats.approvedCertificates}</div>
            <p className="text-xs text-muted-foreground">
              <FileCheck className="w-3 h-3 inline mr-1" />
              Verified certificates
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{studentStats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Under review
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{studentStats.rejectedSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Uploads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{upload.title}</p>
                  <p className="text-sm text-muted-foreground">{upload.category} • {upload.date}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={upload.status === "approved" ? "default" : upload.status === "pending" ? "secondary" : "destructive"}
                    className={upload.status === "approved" ? "bg-success text-success-foreground" : ""}
                  >
                    {upload.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/student/uploads')}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload New Certificate
            </Button>
            
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/student/portfolio')}
            >
              <Eye className="w-4 h-4 mr-2" />
              View My Portfolio
            </Button>
            
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/student/portfolio')}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;