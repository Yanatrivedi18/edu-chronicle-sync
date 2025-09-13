import { 
  BarChart3, 
  FileText, 
  CheckSquare, 
  Upload, 
  User, 
  MessageSquare,
  GraduationCap,
  Home,
  LogOut
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const getNavigationItems = (role: 'STUDENT' | 'FACULTY') => {
  const basePrefix = role === 'STUDENT' ? '/student' : '/faculty';
  
  if (role === 'STUDENT') {
    return [
      { title: "Dashboard", url: `${basePrefix}/dashboard`, icon: Home },
      { title: "My Uploads", url: `${basePrefix}/uploads`, icon: Upload },
      { title: "Digital Portfolio", url: `${basePrefix}/portfolio`, icon: User },
    ];
  } else {
    return [
      { title: "Dashboard", url: `${basePrefix}/dashboard`, icon: Home },
      { title: "Student Approvals", url: `${basePrefix}/approvals`, icon: CheckSquare },
      { title: "Analytics & Reports", url: `${basePrefix}/analytics`, icon: BarChart3 },
      { title: "Chatbot Logs", url: `${basePrefix}/chatbot-logs`, icon: MessageSquare },
    ];
  }
};

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";
  const navigationItems = user ? getNavigationItems(user.role) : [];

  const isActive = (path: string) => {
    return currentPath === path || (path !== '/' && currentPath.startsWith(path));
  };

  const getNavCls = ({ isActive: active }: { isActive: boolean }) =>
    active 
      ? "bg-primary text-primary-foreground font-medium shadow-soft" 
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors";

  const handleLogout = () => {
    logout();
    navigate('/student/login');
  };

  if (!user) return null;

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              user.role === 'STUDENT' ? 'gradient-primary' : 'bg-gradient-to-r from-secondary to-accent'
            }`}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">SIH 2025</h2>
                <p className="text-xs text-sidebar-foreground/60">
                  {user.role === 'STUDENT' ? 'Student Portal' : 'Faculty Portal'}
                </p>
              </div>
            )}
          </div>
        </div>

        {!isCollapsed && (
          <div className="px-6 py-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/60">{user.role.toLowerCase()}</p>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}