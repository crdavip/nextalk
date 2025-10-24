"use client"
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { type Conversation, type Message } from "@/lib/types"
import { type Database } from "@/lib/types/database.types"
import { createClient } from "@/lib/supabase/client"

type DbConversation = Database['public']['Tables']['conversations']['Row']
type DbMessage = Database['public']['Tables']['messages']['Row']
type NewConversation = Database['public']['Tables']['conversations']['Insert']
type NewMessage = Database['public']['Tables']['messages']['Insert']

const mapDbConversationToUi = (dbConvo: Partial<DbConversation> & { messages?: Partial<DbMessage>[] }): Conversation => ({
  id: dbConvo.id!,
  title: dbConvo.name!,
  createdAt: new Date(dbConvo.created_at!),
  updatedAt: new Date(dbConvo.updated_at!),
  messages: (dbConvo.messages || []).map(mapDbMessageToUi),
});

const mapDbMessageToUi = (dbMsg: Partial<DbMessage>): Message => ({
  id: dbMsg.id!,
  role: dbMsg.role === 'user' ? 'user' : 'assistant',
  content: dbMsg.content!,
  timestamp: new Date(dbMsg.created_at!),
});

interface ConversationsContextType {
  conversations: Conversation[]
  activeConversationId: string | null
  activeConversation: Conversation | null
  createConversation: () => Promise<string | undefined>
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => Promise<void>
  addMessage: (conversationId: string, message: Message) => Promise<void>
  updateConversationTitle: (id: string, title: string) => Promise<void>
  clearAllConversations: () => Promise<void>
  isLoading: boolean
}

const ConversationsContext = createContext<ConversationsContextType | undefined>(undefined)

export function ConversationsProvider({ children }: { children: ReactNode }) {
  const supabase = createClient()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('conversations')
        .select('*, messages(*)')
        .is('owner_id', null)
        .order('updated_at', { ascending: false })
        .order('created_at', { foreignTable: 'messages', ascending: true });

      if (error) {
        console.error("Error fetching conversations:", error)
        setConversations([])
      } else if (data) {
        const uiConversations = data.map(c => mapDbConversationToUi(c));
        setConversations(uiConversations)
      }
      setIsLoading(false)
    }
    fetchConversations()
  }, [supabase])

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null

  const createConversation = useCallback(async (): Promise<string | undefined> => {
    const newConversationData: NewConversation = { 
      name: 'Nueva Conversación'
    };
    
    const { data, error } = await supabase
      .from('conversations')
      .insert(newConversationData)
      .select()
      .single()

    if (error) {
      console.error("Error creating conversation:", error)
      return
    }

    if (data) {
        const newConversation: Conversation = { ...mapDbConversationToUi(data), messages: [] }
        setConversations((prev) => [newConversation, ...prev])
        setActiveConversationId(newConversation.id)
        return newConversation.id
    }
  }, [supabase])

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id)
  }, [])

  const deleteConversation = useCallback(async (id: string) => {
    const oldConversations = conversations
    setConversations((prev) => prev.filter((c) => c.id !== id))
    if (activeConversationId === id) {
      const remainingConversations = conversations.filter(c => c.id !== id);
      setActiveConversationId(null)
    }

    const { error } = await supabase.from('conversations').delete().match({ id })

    if (error) {
      console.error("Error deleting conversation:", error)
      setConversations(oldConversations)
    }
  }, [activeConversationId, conversations, supabase])

  const addMessage = useCallback(async (conversationId: string, message: Message) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        const messageExists = c.messages.some(m => m.id === message.id);
        if (messageExists) {
            return { ...c, messages: c.messages.map(m => m.id === message.id ? message : m), updatedAt: new Date() };
        }
        return { ...c, messages: [...c.messages, message], updatedAt: new Date() };
      })
    );

    const newMessage: NewMessage = {
        id: message.id,
        conversation_id: conversationId,
        role: message.role,
        content: message.content,
    }

    const { error } = await supabase
      .from('messages')
      .upsert(newMessage);

    if (error) {
        console.error("Error saving message:", error);
        setConversations(prev => prev.map(c => {
            if (c.id === conversationId) {
                return { ...c, messages: c.messages.filter(m => m.id !== message.id) }
            }
            return c;
        }))
    }
  }, [supabase]);

  const updateConversationTitle = useCallback(async (id: string, title: string) => {
    const oldConversations = conversations;
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title, updatedAt: new Date() } : c))
    )

    const { error } = await supabase
      .from('conversations')
      .update({ name: title })
      .eq('id', id)

    if (error) {
      console.error("Error updating title:", error)
      setConversations(oldConversations)
    }
  }, [conversations, supabase])

  const clearAllConversations = useCallback(async () => {
    const oldConversations = conversations;
    const ids_to_delete = oldConversations.map(c => c.id)
    setConversations([])
    setActiveConversationId(null)

    const { error } = await supabase.from('conversations').delete().in('id', ids_to_delete)

    if (error) {
      console.error("Error clearing conversations:", error)
      setConversations(oldConversations)
    }
  }, [conversations, supabase])

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
        isLoading,
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