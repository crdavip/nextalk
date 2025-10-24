import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Authentication has been removed for the MVP — simply redirect to home.
  return NextResponse.redirect(new URL('/', request.url))
}