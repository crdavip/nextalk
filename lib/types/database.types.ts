export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type MessageRole = 'user' | 'assistant' | 'system'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string | null
          email: string | null
          hashed_password: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username?: string | null
          email?: string | null
          hashed_password?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          email?: string | null
          hashed_password?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          owner_id: string | null
          name: string
          metadata: Json | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id?: string | null
          name?: string
          metadata?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string | null
          name?: string
          metadata?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string | null
          role: MessageRole
          content: string
          content_meta: Json | null
          is_streaming: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id?: string | null
          role: MessageRole
          content: string
          content_meta?: Json | null
          is_streaming?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string | null
          role?: MessageRole
          content?: string
          content_meta?: Json | null
          is_streaming?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      attachments: {
        Row: {
          id: string
          message_id: string
          file_url: string
          mime_type: string | null
          size_bytes: number | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          message_id: string
          file_url: string
          mime_type?: string | null
          size_bytes?: number | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          message_id?: string
          file_url?: string
          mime_type?: string | null
          size_bytes?: number | null
          metadata?: Json | null
          created_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          user_id: string | null
          service: string
          key_encrypted: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          service: string
          key_encrypted: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          service?: string
          key_encrypted?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      message_role: MessageRole
    }
  }
}

// Tipos de ayuda para acceder a las tablas
export type Tables = Database['public']['Tables']
export type TableName = keyof Tables

// Tipos para cada tabla
export type User = Tables['users']['Row']
export type NewUser = Tables['users']['Insert']
export type UserUpdate = Tables['users']['Update']

export type Conversation = Tables['conversations']['Row']
export type NewConversation = Tables['conversations']['Insert']
export type ConversationUpdate = Tables['conversations']['Update']

export type Message = Tables['messages']['Row']
export type NewMessage = Tables['messages']['Insert']
export type MessageUpdate = Tables['messages']['Update']

export type Attachment = Tables['attachments']['Row']
export type NewAttachment = Tables['attachments']['Insert']
export type AttachmentUpdate = Tables['attachments']['Update']

export type ApiKey = Tables['api_keys']['Row']
export type NewApiKey = Tables['api_keys']['Insert']
export type ApiKeyUpdate = Tables['api_keys']['Update']