import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Award, Users, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

const Analytics = () => {
  const { toast } = useToast();

  // Dummy data for semester-wise events
  const semesterData = [
    { semester: 'Sem 1', hackathons: 12, internships: 45, moocs: 89, volunteering: 23, total: 169 },
    { semester: 'Sem 2', hackathons: 18, internships: 52, moocs: 76, volunteering: 31, total: 177 },
    { semester: 'Sem 3', hackathons: 15, internships: 38, moocs: 92, volunteering: 28, total: 173 },
    { semester: 'Sem 4', hackathons: 22, internships: 47, moocs: 104, volunteering: 35, total: 208 },
    { semester: 'Sem 5', hackathons: 19, internships: 41, moocs: 87, volunteering: 29, total: 176 },
    { semester: 'Sem 6', hackathons: 25, internships: 56, moocs: 98, volunteering: 42, total: 221 }
  ];

  // Dummy data for activity distribution
  const activityData = [
    { name: 'Technical', value: 35, color: '#8B5CF6' },
    { name: 'Cultural', value: 25, color: '#F59E0B' },
    { name: 'Sports', value: 20, color: '#10B981' },
    { name: 'Social Service', value: 20, color: '#3B82F6' }
  ];

  const generateNAACReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('NAAC Student Activity Report', 20, 30);
    
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 45);
    doc.text('Academic Year: 2023-24', 20, 55);
    
    // Summary Statistics
    doc.setFontSize(16);
    doc.text('Summary Statistics', 20, 75);
    
    doc.setFontSize(12);
    doc.text('Total Students Enrolled: 1,248', 20, 90);
    doc.text('Total Certificates Approved: 356', 20, 100);
    doc.text('Total Activities Recorded: 1,124', 20, 110);
    doc.text('Student Participation Rate: 89.5%', 20, 120);
    
    // Activity Breakdown
    doc.setFontSize(16);
    doc.text('Activity Breakdown', 20, 140);
    
    doc.setFontSize(12);
    doc.text('• Technical Activities: 35% (393 events)', 30, 155);
    doc.text('• Cultural Activities: 25% (281 events)', 30, 165);
    doc.text('• Sports Activities: 20% (225 events)', 30, 175);
    doc.text('• Social Service: 20% (225 events)', 30, 185);
    
    // Semester Performance
    doc.setFontSize(16);
    doc.text('Semester-wise Performance', 20, 205);
    
    doc.setFontSize(12);
    semesterData.forEach((sem, index) => {
      doc.text(`${sem.semester}: ${sem.total} total activities`, 30, 220 + (index * 10));
    });
    
    // Footer
    doc.setFontSize(10);
    doc.text('This report is generated automatically by the Student Activity Record Hub', 20, 280);
    doc.text('For queries, contact: admin@college.edu.in', 20, 290);
    
    doc.save('NAAC-Activity-Report.pdf');
    
    toast({
      title: "Report Generated! 📊",
      description: "NAAC report has been downloaded successfully.",
    });
  };

  const generateNIRFReport = () => {
    toast({
      title: "NIRF Report Generated! 📈", 
      description: "NIRF compliance report is being prepared...",
    });
    // Similar implementation for NIRF report
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights and NAAC/NIRF reporting</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateNAACReport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            NAAC Report
          </Button>
          <Button variant="outline" onClick={generateNIRFReport} className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            NIRF Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Activities</p>
                <p className="text-2xl font-bold text-foreground">1,124</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% this year
                </p>
              </div>
              <Award className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Participation Rate</p>
                <p className="text-2xl font-bold text-success">89.5%</p>
                <p className="text-xs text-muted-foreground mt-1">1,118 of 1,248 students</p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg per Student</p>
                <p className="text-2xl font-bold text-primary">3.2</p>
                <p className="text-xs text-muted-foreground mt-1">certificates/student</p>
              </div>
              <Award className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">NAAC Score</p>
                <p className="text-2xl font-bold text-accent">A++</p>
                <p className="text-xs text-accent mt-1">Excellent rating</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Semester-wise Bar Chart */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Semester-wise Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={semesterData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="hackathons" fill="#8B5CF6" name="Hackathons" />
                <Bar dataKey="internships" fill="#3B82F6" name="Internships" />
                <Bar dataKey="moocs" fill="#F59E0B" name="MOOCs" />
                <Bar dataKey="volunteering" fill="#10B981" name="Volunteering" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Type Pie Chart */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Activity Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Detailed Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Top Performing Categories</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Technical Events</span>
                  <span className="font-medium">393 events</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cultural Events</span>
                  <span className="font-medium">281 events</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sports Events</span>
                  <span className="font-medium">225 events</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Monthly Growth</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-medium text-success">+15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Month</span>
                  <span className="font-medium">+12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">3 Months Ago</span>
                  <span className="font-medium">+8%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Quality Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Approval Rate</span>
                  <span className="font-medium text-success">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Response Time</span>
                  <span className="font-medium">2.1 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Student Satisfaction</span>
                  <span className="font-medium text-success">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;