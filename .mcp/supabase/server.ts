import { createClient, SupabaseClient, PostgrestError } from '@supabase/supabase-js'
import type { Database } from '../../lib/supabase'

interface DatabaseFunctions {
  execute_sql_query: (args: { sql_query: string }) => Promise<unknown>
}

type DatabaseWithRPC = Database & {
  public: {
    Functions: DatabaseFunctions
  }
}

type Tables = Database['public']['Tables']
type TableName = keyof Tables & string
type Row<T extends TableName> = Tables[T]['Row']
type Insert<T extends TableName> = Tables[T]['Insert']
type Update<T extends TableName> = Tables[T]['Update']

type SupabaseResponse<T> = {
  data: T | null
  error: PostgrestError | null
}

type FromTable<T extends TableName> = {
  Row: Row<T>
  Insert: Insert<T>
  Update: Update<T>
}

export class SupabaseMCPServer {
  private supabase: SupabaseClient
  
  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    this.supabase = createClient(supabaseUrl, supabaseServiceKey)
  }

  private async executeQuery(query: string): Promise<unknown> {
    try {
      const { data, error } = await this.supabase
        .rpc('execute_sql_query', { sql_query: query } as any)
      
      if (error) throw error
      return data
    } catch (error) {
      throw new Error(`Query execution failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  async createTable(tableName: string, columns: Record<string, string>): Promise<unknown> {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${
      Object.entries(columns)
        .map(([name, type]) => `${name} ${type}`)
        .join(', ')
    })`
    return this.executeQuery(query)
  }

  async query(query: string): Promise<unknown> {
    return this.executeQuery(query)
  }

  async insert<T extends TableName>(
    table: T,
    data: Insert<T>
  ): Promise<Row<T>[]> {
    try {
      const { data: result, error } = await this.supabase
        .from(table)
        .insert(data as any)
        .select()
        .returns<Row<T>[]>()

      if (error) throw error
      if (!result) throw new Error('No data returned from insert')
      return result
    } catch (error) {
      throw new Error(`Insert failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  async update<T extends TableName>(
    table: T,
    data: Update<T>,
    match: Partial<Row<T>>
  ): Promise<Row<T>[]> {
    try {
      const { data: result, error } = await this.supabase
        .from(table)
        .update(data as any)
        .match(match as any)
        .select()
        .returns<Row<T>[]>()

      if (error) throw error
      if (!result) throw new Error('No data returned from update')
      return result
    } catch (error) {
      throw new Error(`Update failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  async delete<T extends TableName>(
    table: T,
    match: Partial<Row<T>>
  ): Promise<Row<T>[]> {
    try {
      const { data: result, error } = await this.supabase
        .from(table)
        .delete()
        .match(match as any)
        .select()
        .returns<Row<T>[]>()

      if (error) throw error
      if (!result) throw new Error('No data returned from delete')
      return result
    } catch (error) {
      throw new Error(`Delete failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // Auth methods
  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password })
  }

  async signOut() {
    return await this.supabase.auth.signOut()
  }

  async getCurrentUser() {
    return await this.supabase.auth.getUser()
  }
}