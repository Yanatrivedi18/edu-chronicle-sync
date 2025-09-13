import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppLayout } from "@/components/layout/app-layout";
import Dashboard from "./pages/Dashboard";
import StudentUploads from "./pages/StudentUploads";
import FacultyApprovals from "./pages/FacultyApprovals";
import Analytics from "./pages/Analytics";
import Portfolio from "./pages/Portfolio";
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
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <Routes>
                <Route path="/*" element={<AppLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="uploads" element={<StudentUploads />} />
                  <Route path="approvals" element={<FacultyApprovals />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="portfolio" element={<Portfolio />} />
                  <Route path="chatbot-logs" element={<ChatbotLogs />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;