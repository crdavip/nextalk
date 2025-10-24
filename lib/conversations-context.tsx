"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { Conversation, Message } from "./types"

interface ConversationsContextType {
  conversations: Conversation[]
  activeConversationId: string | null
  activeConversation: Conversation | null
  createConversation: () => void
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => void
  addMessage: (conversationId: string, message: Message) => void
  updateConversationTitle: (id: string, title: string) => void
  clearAllConversations: () => void
}

const ConversationsContext = createContext<ConversationsContextType | undefined>(undefined)

const STORAGE_KEY = "nextalk_conversations"
const ACTIVE_CONVERSATION_KEY = "nextalk_active_conversation"

function saveToLocalStorage(key: string, data: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("[v0] Error al guardar en localStorage:", error)
  }
}

function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    if (!item) return defaultValue

    const parsed = JSON.parse(item)

    // Convertir strings de fecha a objetos Date
    if (Array.isArray(parsed)) {
      return parsed.map((conv) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      })) as T
    }

    return parsed
  } catch (error) {
    console.error("[v0] Error al cargar desde localStorage:", error)
    return defaultValue
  }
}

export function ConversationsProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedConversations = loadFromLocalStorage<Conversation[]>(STORAGE_KEY, [])
    const savedActiveId = loadFromLocalStorage<string | null>(ACTIVE_CONVERSATION_KEY, null)

    setConversations(savedConversations)
    setActiveConversationId(savedActiveId)
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      saveToLocalStorage(STORAGE_KEY, conversations)
    }
  }, [conversations, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      saveToLocalStorage(ACTIVE_CONVERSATION_KEY, activeConversationId)
    }
  }, [activeConversationId, isInitialized])

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null

  const createConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: `Nueva conversación ${conversations.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setConversations((prev) => [newConversation, ...prev])
    setActiveConversationId(newConversation.id)
  }, [conversations.length])

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id)
  }, [])

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id))
      if (activeConversationId === id) {
        setActiveConversationId(null)
      }
    },
    [activeConversationId],
  )

  const addMessage = useCallback((conversationId: string, message: Message) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c

        const existingMessageIndex = c.messages.findIndex((m) => m.id === message.id)

        if (existingMessageIndex !== -1) {
          // Actualizar mensaje existente
          const updatedMessages = [...c.messages]
          updatedMessages[existingMessageIndex] = message
          return {
            ...c,
            messages: updatedMessages,
            updatedAt: new Date(),
          }
        } else {
          // Agregar nuevo mensaje
          return {
            ...c,
            messages: [...c.messages, message],
            updatedAt: new Date(),
          }
        }
      }),
    )
  }, [])

  const updateConversationTitle = useCallback((id: string, title: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              title,
              updatedAt: new Date(),
            }
          : c,
      ),
    )
  }, [])

  const clearAllConversations = useCallback(() => {
    setConversations([])
    setActiveConversationId(null)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(ACTIVE_CONVERSATION_KEY)
  }, [])

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        activeConversationId,
        activeConversation,
        createConversation,
        selectConversation,
        deleteConversation,
        addMessage,
        updateConversationTitle,
        clearAllConversations,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  )
}

export function useConversations() {
  const context = useContext(ConversationsContext)
  if (!context) {
    throw new Error("useConversations must be used within ConversationsProvider")
  }
  return context
}
