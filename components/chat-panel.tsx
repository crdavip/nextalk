"use client"

import { useConversations } from "@/lib/conversations-context"
import { MessagesList } from "./messages-list"
import { MessageInput } from "./message-input"
import type { Message } from "@/lib/types"
import { useState } from "react"

export function ChatPanel() {
  const { activeConversation, addMessage, updateConversationTitle } = useConversations()
  const [isLoading, setIsLoading] = useState(false)

  if (!activeConversation) {
    return null
  }

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    addMessage(activeConversation.id, userMessage)

    if (activeConversation.messages.length === 0) {
      const title = content.slice(0, 30) + (content.length > 30 ? "..." : "")
      updateConversationTitle(activeConversation.id, title)
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...activeConversation.messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        // Try to read error body for more details
        let errText = ""
        try {
          errText = await response.text()
        } catch (e) {
          // ignore
        }
        console.error("/api/chat error", response.status, errText)
        const message = errText || `Error al obtener respuesta de IA (status ${response.status})`
        throw new Error(message)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiMessageContent = ""

      const aiMessageId = crypto.randomUUID()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              const content = line.slice(2).replace(/^"|"$/g, "")
              aiMessageContent += content

              const existingMessage = activeConversation.messages.find((m) => m.id === aiMessageId)

              if (existingMessage) {
                // Actualizar mensaje existente
                const updatedMessages = activeConversation.messages.map((m) =>
                  m.id === aiMessageId ? { ...m, content: aiMessageContent } : m,
                )
                // Forzar actualización del estado
                addMessage(activeConversation.id, {
                  id: aiMessageId,
                  role: "assistant",
                  content: aiMessageContent,
                  timestamp: new Date(),
                })
              } else {
                // Crear nuevo mensaje
                addMessage(activeConversation.id, {
                  id: aiMessageId,
                  role: "assistant",
                  content: aiMessageContent,
                  timestamp: new Date(),
                })
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("[v0] Error al enviar mensaje:", error)
      const errMsg = error instanceof Error ? error.message : String(error)
      // Mostrar el mensaje de error real devuelto por el servidor para depuración/UX
      addMessage(activeConversation.id, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Lo siento, hubo un error al procesar tu mensaje: ${errMsg}`,
        timestamp: new Date(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <MessagesList messages={activeConversation.messages} />
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  )
}
