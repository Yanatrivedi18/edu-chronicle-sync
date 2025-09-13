import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Upload {
  id: string;
  filename: string;
  category: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  studentName: string;
}

const StudentUploads = () => {
  const { toast } = useToast();
  const [uploads, setUploads] = useState<Upload[]>([
    {
      id: "1",
      filename: "hackathon_certificate.pdf",
      category: "Hackathon",
      uploadDate: "2024-01-15",
      status: "approved",
      studentName: "Rahul Sharma"
    },
    {
      id: "2", 
      filename: "internship_letter.pdf",
      category: "Internship",
      uploadDate: "2024-01-14",
      status: "pending",
      studentName: "Priya Singh"
    },
    {
      id: "3",
      filename: "mooc_completion.jpg",
      category: "MOOC",
      uploadDate: "2024-01-13",
      status: "pending",
      studentName: "Amit Kumar"
    }
  ]);

  const [formData, setFormData] = useState({
    studentName: "",
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
    
    if (!formData.studentName || !formData.category || !formData.file) {
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
      studentName: formData.studentName
    };

    setUploads(prev => [newUpload, ...prev]);
    setFormData({ studentName: "", category: "", file: null });
    
    toast({
      title: "Success!",
      description: "Certificate uploaded successfully and sent for approval",
    });

    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const getStatusBadge = (status: Upload["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Student Uploads</h1>
        <p className="text-muted-foreground">Upload and manage student achievement certificates</p>
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
                <Label htmlFor="student-name">Student Name</Label>
                <Input
                  id="student-name"
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
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
                  Supported formats: PDF, JPG, PNG (Max 5MB)
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
            <CardTitle>Upload Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{uploads.filter(u => u.status === "approved").length}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">{uploads.filter(u => u.status === "pending").length}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
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
            Recent Uploads
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
                        <User className="w-3 h-3" />
                        {upload.studentName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {upload.uploadDate}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {upload.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(upload.status)}
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
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