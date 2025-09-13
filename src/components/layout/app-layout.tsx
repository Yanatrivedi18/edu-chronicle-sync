import { Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";
import { Chatbot } from "@/components/chatbot/chatbot";

export function AppLayout() {
  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 bg-muted/30">
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </>
  );
}