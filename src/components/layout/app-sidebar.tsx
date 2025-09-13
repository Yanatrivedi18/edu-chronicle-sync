import { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  CheckSquare, 
  Upload, 
  User, 
  MessageSquare,
  GraduationCap,
  Home
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

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

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Student Uploads", url: "/uploads", icon: Upload },
  { title: "Faculty Approvals", url: "/approvals", icon: CheckSquare },
  { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
  { title: "Digital Portfolio", url: "/portfolio", icon: User },
  { title: "Chatbot Logs", url: "/chatbot-logs", icon: MessageSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive: active }: { isActive: boolean }) =>
    active 
      ? "bg-primary text-primary-foreground font-medium shadow-soft" 
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">SIH 2025</h2>
                <p className="text-xs text-sidebar-foreground/60">Activity Hub</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
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
      </SidebarContent>
    </Sidebar>
  );
}