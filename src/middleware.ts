import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value
  
  // Protéger les routes admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Rediriger les utilisateurs connectés depuis les pages auth
  if (request.nextUrl.pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*']
}