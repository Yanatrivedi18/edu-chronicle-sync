import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/app-layout";

// Auth pages
import StudentLogin from "./pages/auth/StudentLogin";
import FacultyLogin from "./pages/auth/FacultyLogin";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentUploads from "./pages/student/StudentUploads";
import Portfolio from "./pages/Portfolio";

// Faculty pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyApprovals from "./pages/FacultyApprovals";
import Analytics from "./pages/Analytics";
import ChatbotLogs from "./pages/ChatbotLogs";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="sih-dashboard-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/student/login" />} />
              
              {/* Auth routes */}
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/faculty/login" element={<FacultyLogin />} />
              
              {/* Student routes */}
              <Route path="/student/*" element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <SidebarProvider>
                    <div className="min-h-screen flex w-full">
                      <AppLayout />
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="uploads" element={<StudentUploads />} />
                <Route path="portfolio" element={<Portfolio />} />
              </Route>
              
              {/* Faculty routes */}
              <Route path="/faculty/*" element={
                <ProtectedRoute allowedRoles={['FACULTY']}>
                  <SidebarProvider>
                    <div className="min-h-screen flex w-full">
                      <AppLayout />
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<FacultyDashboard />} />
                <Route path="approvals" element={<FacultyApprovals />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="chatbot-logs" element={<ChatbotLogs />} />
              </Route>
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;