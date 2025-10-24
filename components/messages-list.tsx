"use client"

import { useEffect, useRef } from "react"
import { MessageBubble } from "./message-bubble"
import type { Message } from "@/lib/types"

interface MessagesListProps {
  messages: Message[]
}

export function MessagesList({ messages }: MessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <p className="text-sm">Envía un mensaje para comenzar la conversación</p>
      </div>
    )
  }

  return (
    <div className="h-[80dvh] sm:h-[680px] overflow-y-auto px-4 py-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
