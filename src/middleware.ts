import { NextResponse } from 'next/server'

export async function middleware() {
  // Allow all traffic in mock mode without supabase
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
