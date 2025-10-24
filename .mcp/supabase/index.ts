import { MCPRequest, MCPResponse } from './types'
import { SupabaseMCPServer } from './server'

const server = new SupabaseMCPServer()

export async function handleMCPRequest(request: MCPRequest): Promise<MCPResponse> {
  try {
    switch (request.command) {
      case 'database.createTable':
        return {
          success: true,
          data: await server.createTable(request.params.name, request.params.columns)
        }
      
      case 'database.query':
        return {
          success: true,
          data: await server.query(request.params.query)
        }
      
      case 'database.insert':
        return {
          success: true,
          data: await server.insert(request.params.table, request.params.data)
        }
      
      case 'database.update':
        return {
          success: true,
          data: await server.update(request.params.table, request.params.data, request.params.match)
        }
      
      case 'database.delete':
        return {
          success: true,
          data: await server.delete(request.params.table, request.params.match)
        }
      
      case 'auth.signIn':
        return {
          success: true,
          data: await server.signIn(request.params.email, request.params.password)
        }
      
      case 'auth.signOut':
        return {
          success: true,
          data: await server.signOut()
        }
      
      case 'auth.getCurrentUser':
        return {
          success: true,
          data: await server.getCurrentUser()
        }
      
      default:
        return {
          success: false,
          error: `Unknown command: ${request.command}`
        }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}