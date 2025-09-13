import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Eye, Clock, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PendingApproval {
  id: string;
  studentName: string;
  filename: string;
  category: string;
  uploadDate: string;
  description: string;
  fileSize: string;
}

const FacultyApprovals = () => {
  const { toast } = useToast();
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([
    {
      id: "1",
      studentName: "Priya Singh", 
      filename: "internship_certificate.pdf",
      category: "Internship",
      uploadDate: "2024-01-14",
      description: "6-month internship at Tech Solutions Pvt Ltd",
      fileSize: "2.3 MB"
    },
    {
      id: "2",
      studentName: "Amit Kumar",
      filename: "hackathon_winner.jpg", 
      category: "Hackathon",
      uploadDate: "2024-01-13",
      description: "First prize in National Coding Championship 2024",
      fileSize: "1.8 MB"
    },
    {
      id: "3",
      studentName: "Neha Patel",
      filename: "volunteer_certificate.pdf",
      category: "Volunteering", 
      uploadDate: "2024-01-12",
      description: "100 hours community service - Blood donation camp",
      fileSize: "1.2 MB"
    },
    {
      id: "4", 
      studentName: "Rohit Verma",
      filename: "course_completion.pdf",
      category: "MOOC",
      uploadDate: "2024-01-11",
      description: "Machine Learning Specialization - Coursera",
      fileSize: "956 KB"
    }
  ]);

  const [approvedToday, setApprovedToday] = useState(12);
  const [rejectedToday, setRejectedToday] = useState(2);

  const handleApprove = (approvalId: string) => {
    const approval = pendingApprovals.find(a => a.id === approvalId);
    if (!approval) return;

    setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));
    setApprovedToday(prev => prev + 1);
    
    toast({
      title: "Certificate Approved! ✅",
      description: `${approval.studentName}'s ${approval.category.toLowerCase()} certificate has been approved.`,
    });
  };

  const handleReject = (approvalId: string) => {
    const approval = pendingApprovals.find(a => a.id === approvalId);
    if (!approval) return;

    setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));
    setRejectedToday(prev => prev + 1);
    
    toast({
      title: "Certificate Rejected",
      description: `${approval.studentName}'s ${approval.category.toLowerCase()} certificate has been rejected.`,
      variant: "destructive"
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Hackathon": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Internship": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", 
      "Volunteering": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "MOOC": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Approvals</h1>
          <p className="text-muted-foreground">Review and approve student certificate submissions</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {pendingApprovals.length} Pending
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-warning">{pendingApprovals.length}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold text-success">{approvedToday}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected Today</p>
                <p className="text-2xl font-bold text-destructive">{rejectedToday}</p>
              </div>
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Pending Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingApprovals.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="font-semibold text-foreground">All caught up!</h3>
              <p className="text-muted-foreground">No pending approvals at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="border border-border rounded-lg p-6 space-y-4 hover:shadow-soft transition-all">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">{approval.filename}</h3>
                        <Badge className={getCategoryColor(approval.category)} variant="secondary">
                          {approval.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {approval.studentName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {approval.uploadDate}
                        </span>
                        <span>{approval.fileSize}</span>
                      </div>
                      
                      <p className="text-sm text-foreground">{approval.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View File
                    </Button>
                    
                    <div className="ml-auto flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(approval.id)}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      
                      <Button
                        size="sm"
                        onClick={() => handleApprove(approval.id)}
                        className="bg-success hover:bg-success/90 text-success-foreground"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyApprovals;