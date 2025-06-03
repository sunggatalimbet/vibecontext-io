/**
 * @file: middleware.ts
 * @description: Next.js middleware for handling authentication and route protection
 * @dependencies: @repo/auth, next/server
 * @created: 2024-12-19
 */

import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextResponse, type NextRequest } from 'next/server'
import { createAuthServer, createAuthConfig } from '@repo/auth/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const authConfig = createAuthConfig(process.env)
  const authServer = createAuthServer({
    config: authConfig,
    request: {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        set(name, value, options: ResponseCookie) {
          request.cookies.set(name, value)
          supabaseResponse = NextResponse.next({
            request,
          })
          supabaseResponse.cookies.set(name, value, options)
        },
      },
    },
  })

  // This will refresh session if expired - required for Server Components
  const { user } = await authServer.getUser()

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isPublicPage = isAuthPage || request.nextUrl.pathname === '/'

  // If user is signed in and trying to access auth pages, redirect to dashboard
  if (user && isAuthPage && request.nextUrl.pathname !== '/auth/callback') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'
    return NextResponse.redirect(redirectUrl)
  }

  // If user is not signed in and trying to access protected pages, redirect to login
  if (!user && !isPublicPage) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
