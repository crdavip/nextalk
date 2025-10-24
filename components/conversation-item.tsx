"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { Conversation } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
  onSelect: () => void
  onDelete: () => void
}

export function ConversationItem({ conversation, isActive, onSelect, onDelete }: ConversationItemProps) {
  const lastMessage = conversation.messages[conversation.messages.length - 1]
  const preview = lastMessage?.content.slice(0, 40) || "Sin mensajes"

  return (
    <div
      className={cn(
        "flex items-start gap-2 px-3 py-2 mx-2 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors group",
        isActive && "bg-accent",
      )}
      onClick={onSelect}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{conversation.title}</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 h-6 w-6"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
      </Button>
    </div>
  )
}
