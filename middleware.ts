import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Authentication removed for MVP — middleware is a no-op that allows all requests.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}