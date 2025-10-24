import { Database } from '../../lib/supabase'

export type MCPRequest = {
  command: string
  params: any
}

export type MCPResponse = {
  success: boolean
  data?: any
  error?: string
}

export type TableDefinition = {
  name: string
  columns: Record<string, string>
}

export type QueryParams = {
  text: string
  values?: any[]
}

export type InsertParams = {
  table: keyof Database['public']['Tables']
  data: Record<string, any>
}

export type UpdateParams = {
  table: keyof Database['public']['Tables']
  data: Record<string, any>
  match: Record<string, any>
}

export type DeleteParams = {
  table: keyof Database['public']['Tables']
  match: Record<string, any>
}