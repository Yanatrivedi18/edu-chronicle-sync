import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Clock, TrendingUp, FileCheck, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 1248,
    approvedCertificates: 356,
    pendingApprovals: 42,
    thisMonthSubmissions: 89
  });

  const [recentActivity] = useState([
    { id: 1, student: "Rahul Sharma", activity: "Hackathon Certificate", status: "approved", time: "2 hours ago" },
    { id: 2, student: "Priya Singh", activity: "MOOC Completion", status: "pending", time: "4 hours ago" },
    { id: 3, student: "Amit Kumar", activity: "Internship Certificate", status: "approved", time: "6 hours ago" },
    { id: 4, student: "Neha Patel", activity: "Volunteering Certificate", status: "pending", time: "1 day ago" },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Student Activity Record Hub</p>
        </div>
        <Badge variant="secondary" className="animate-bounce-gentle">
          Live Data
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Certificates</CardTitle>
            <Award className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.approvedCertificates}</div>
            <p className="text-xs text-muted-foreground">
              <FileCheck className="w-3 h-3 inline mr-1" />
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.thisMonthSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              New submissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{activity.student}</p>
                  <p className="text-sm text-muted-foreground">{activity.activity}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={activity.status === "approved" ? "default" : "secondary"}
                    className={activity.status === "approved" ? "bg-success text-success-foreground" : ""}
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
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
            <button className="w-full p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Review Pending Approvals</p>
                  <p className="text-sm text-muted-foreground">{stats.pendingApprovals} items waiting</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 text-left bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium text-foreground">Generate NAAC Report</p>
                  <p className="text-sm text-muted-foreground">Export latest analytics</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 text-left bg-success/10 hover:bg-success/20 rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium text-foreground">Student Portfolios</p>
                  <p className="text-sm text-muted-foreground">View digital profiles</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;