"use client"

import { useConversations } from "@/lib/conversations-context"
import { ConversationItem } from "./conversation-item"

export function ConversationsList() {
  const { conversations, activeConversationId, selectConversation, deleteConversation } = useConversations()

  const groupedConversations = conversations.reduce(
    (groups, conversation) => {
      const date = new Date(conversation.updatedAt)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)

      let label = ""
      if (date.toDateString() === today.toDateString()) {
        label = "Hoy"
      } else if (date.toDateString() === yesterday.toDateString()) {
        label = "Ayer"
      } else if (date > weekAgo) {
        label = "Últimos 7 días"
      } else {
        label = "Más antiguo"
      }

      if (!groups[label]) {
        groups[label] = []
      }
      groups[label].push(conversation)
      return groups
    },
    {} as Record<string, typeof conversations>,
  )

  if (conversations.length === 0) {
    return (
      <div className="flex-1 p-4 text-center text-muted-foreground">
        <p className="text-sm">No hay conversaciones</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {Object.entries(groupedConversations).map(([label, convs]) => (
        <div key={label}>
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">{label}</div>
          {convs.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === activeConversationId}
              onSelect={() => selectConversation(conversation.id)}
              onDelete={() => deleteConversation(conversation.id)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
