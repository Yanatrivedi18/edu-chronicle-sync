import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Calendar, User, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Upload {
  id: string;
  filename: string;
  category: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  studentName: string;
  comments?: string;
}

const StudentUploads = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [uploads, setUploads] = useState<Upload[]>([
    {
      id: "1",
      filename: "ml_certificate.pdf",
      category: "MOOC",
      uploadDate: "2024-01-15",
      status: "approved",
      studentName: user?.name || "Current User",
      comments: "Excellent completion certificate from Stanford University"
    },
    {
      id: "2", 
      filename: "hackathon_winner.jpg",
      category: "Hackathon",
      uploadDate: "2024-01-14",
      status: "approved",
      studentName: user?.name || "Current User",
      comments: "Outstanding achievement in SIH 2024"
    },
    {
      id: "3",
      filename: "internship_letter.pdf",
      category: "Internship",
      uploadDate: "2024-01-13",
      status: "pending",
      studentName: user?.name || "Current User"
    },
    {
      id: "4",
      filename: "volunteer_certificate.pdf",
      category: "Volunteering",
      uploadDate: "2024-01-12",
      status: "pending",
      studentName: user?.name || "Current User"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    file: null as File | null
  });

  const categories = ["Hackathon", "Internship", "MOOC", "Volunteering", "Workshop", "Competition"];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.file) {
      toast({
        title: "Error",
        description: "Please fill all fields and select a file",
        variant: "destructive"
      });
      return;
    }

    const newUpload: Upload = {
      id: Date.now().toString(),
      filename: formData.file.name,
      category: formData.category,
      uploadDate: new Date().toISOString().split('T')[0],
      status: "pending",
      studentName: user?.name || "Current User"
    };

    setUploads(prev => [newUpload, ...prev]);
    setFormData({ title: "", category: "", file: null });
    
    toast({
      title: "Success!",
      description: "Certificate uploaded successfully and sent for approval",
    });

    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = (uploadId: string) => {
    setUploads(prev => prev.filter(u => u.id !== uploadId));
    toast({
      title: "Deleted",
      description: "Upload removed successfully",
    });
  };

  const getStatusBadge = (upload: Upload) => {
    switch (upload.status) {
      case "approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const pendingCount = uploads.filter(u => u.status === "pending").length;
  const approvedCount = uploads.filter(u => u.status === "approved").length;
  const rejectedCount = uploads.filter(u => u.status === "rejected").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Uploads</h1>
        <p className="text-muted-foreground">Upload and manage your achievement certificates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Form */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload New Certificate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Certificate Title</Label>
                <Input
                  id="title"
                  placeholder="Enter certificate title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-upload">Certificate File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </div>

              <Button type="submit" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Certificate
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Upload Statistics */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>My Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{approvedCount}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">{pendingCount}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center p-4 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive">{rejectedCount}</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {categories.map(cat => {
                const count = uploads.filter(u => u.category === cat).length;
                return (
                  <div key={cat} className="flex justify-between items-center">
                    <span className="text-sm">{cat}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploads Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            My Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{upload.filename}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {upload.uploadDate}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {upload.category}
                      </Badge>
                    </div>
                    {upload.comments && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        "{upload.comments}"
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(upload)}
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {upload.status === "pending" && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(upload.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentUploads;