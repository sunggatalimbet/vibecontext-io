/**
 * @file: route.ts
 * @description: OAuth callback handler for Supabase authentication
 * @dependencies: @repo/auth, next/server
 * @created: 2024-12-19
 */

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import {
  createAuthServer,
  createAuthConfig,
  validateRedirectUrl,
  sanitizeErrorMessage,
} from '@repo/auth'
import { toast } from 'sonner'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = validateRedirectUrl(searchParams.get('next'), origin) ?? '/'

  if (code) {
    const cookieStore = await cookies()
    const authConfig = createAuthConfig(process.env)

    const authServer = createAuthServer({
      config: authConfig,
      request: {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          set(name, value, options) {
            cookieStore.set(name, value, options)
          },
        },
      },
    })

    try {
      const { error } = await authServer.exchangeCodeForSession(code)

      if (!error) {
        // Successful authentication - redirect to the app
        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`)
        } else {
          return NextResponse.redirect(`${origin}${next}`)
        }
      } else {
        toast.error('Auth callback error:', error)
        const errorMessage = sanitizeErrorMessage(
          error.message,
          'Authentication failed'
        )
        return NextResponse.redirect(
          `${origin}/auth/error?message=${encodeURIComponent(errorMessage)}`
        )
      }
    } catch (err) {
      console.error(err)
      toast.error('Unexpected auth callback error')
      const errorMessage = sanitizeErrorMessage(
        'Unexpected error during authentication',
        'Authentication failed'
      )
      return NextResponse.redirect(
        `${origin}/auth/error?message=${encodeURIComponent(errorMessage)}`
      )
    }
  }

  // No code parameter - redirect to login
  return NextResponse.redirect(
    `${origin}/auth/login?message=No authorization code provided`
  )
}
