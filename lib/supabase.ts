import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string
          created_at: string
          title: string
          user_id: string
          last_message: string | null
          last_message_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          user_id: string
          last_message?: string | null
          last_message_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          user_id?: string
          last_message?: string | null
          last_message_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          conversation_id: string
          content: string
          role: 'user' | 'assistant'
        }
        Insert: {
          id?: string
          created_at?: string
          conversation_id: string
          content: string
          role: 'user' | 'assistant'
        }
        Update: {
          id?: string
          created_at?: string
          conversation_id?: string
          content?: string
          role?: 'user' | 'assistant'
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          avatar_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
        }
      }
    }
  }
}