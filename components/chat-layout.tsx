"use client"
import { useState } from "react"
import { SidebarHeader } from "./sidebar-header"
import { SidebarNavigation } from "./sidebar-navigation"
import { SidebarFooter } from "./sidebar-footer"
import { ChatHeader } from "./chat-header"
import { ConversationsList } from "./conversations-list"
import { useConversations } from "@/lib/conversations-context"
import { ChatPanel } from "./chat-panel"
import { WelcomeScreen } from "./welcome-screen"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function ChatLayout() {
  const { activeConversation } = useConversations()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[280px] border-r border-border flex flex-col bg-card
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="lg:hidden absolute top-4 right-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <SidebarHeader />
        <SidebarNavigation />
        <ConversationsList />
        <SidebarFooter />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {activeConversation ? (
          <>
            <ChatHeader onMenuClick={() => setIsSidebarOpen(true)} />
            <ChatPanel />
          </>
        ) : (
          <WelcomeScreen onMenuClick={() => setIsSidebarOpen(true)} />
        )}
      </div>
    </div>
  )
}
