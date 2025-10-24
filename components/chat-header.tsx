"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, Menu } from "lucide-react"
import { useConversations } from "@/lib/conversations-context"

interface ChatHeaderProps {
  onMenuClick: () => void
}

export function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  const { createConversation, activeConversation, conversations } = useConversations()

  const currentConversation = conversations.find((c) => c.id === activeConversation)

  return (
    <div className="h-14 md:h-16 border-b border-border bg-card flex items-center justify-between px-3 md:px-6">
      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
        <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 shrink-0" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>

        {/* Selector de modelo */}
        <Button variant="ghost" className="gap-2 h-9 md:h-10 text-xs md:text-sm px-2 md:px-4 shrink-0">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">AI</span>
          </div>
          <span className="hidden sm:inline font-medium">NexTalk 4o</span>
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
        </Button>

        {currentConversation && (
          <div className="hidden md:flex items-center gap-2 flex-1 min-w-0 ml-2">
            <div className="h-6 w-px bg-border" />
            <h2 className="text-sm font-medium truncate text-muted-foreground">{currentConversation.title}</h2>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <button
          onClick={createConversation}
          className="px-3 md:px-4 py-1.5 md:py-2 bg-foreground text-background rounded-lg text-xs md:text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          <span className="hidden sm:inline">+ Nuevo Chat</span>
          <span className="sm:hidden">+ Chat</span>
        </button>

        <Avatar className="w-8 h-8 md:w-9 md:h-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
