/**
 * @file: page.tsx
 * @description: Login page with OAuth authentication options
 * @dependencies: React, @repo/auth, shadcn/ui components
 * @created: 2024-12-19
 */

'use client'

import { useEffect, useState, Suspense, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@repo/auth/react'
import { Github, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function LoginContent() {
  const { signInWithOAuth, user, loading, error } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  const message = searchParams.get('message')

  // Add individual loading states for each OAuth provider
  const [googleLoading, setGoogleLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)

  // Add local error state for OAuth sign-in failures
  const [oauthError, setOauthError] = useState<string | null>(null)

  // Safely validate and get redirect destination
  const getRedirectTo = useCallback(() => {
    const redirectTo = searchParams.get('redirectTo')
    if (!redirectTo) return null

    // Validate that it's a safe internal path
    try {
      const url = new URL(redirectTo, window.location.origin)
      if (url.origin === window.location.origin) {
        return url.pathname + url.search
      }
    } catch {
      // Invalid URL, ignore
    }
    return null
  }, [searchParams])

  // Redirect authenticated users
  useEffect(() => {
    if (user && !loading) {
      const redirectTo = getRedirectTo()
      router.push(redirectTo || '/')
    }
  }, [user, loading, router, getRedirectTo])

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true)
      setOauthError(null) // Clear any previous errors
      const redirectTo = getRedirectTo()
      const callbackUrl = new URL('/auth/callback', window.location.origin)
      if (redirectTo) {
        callbackUrl.searchParams.set('next', redirectTo)
      }

      await signInWithOAuth('google', {
        redirectTo: callbackUrl.toString(),
      })
    } catch (err) {
      console.error('Google sign-in failed:', err)
      setGoogleLoading(false)
      setOauthError('Failed to sign in with Google. Please try again.')
    }
  }

  const handleGithubSignIn = async () => {
    try {
      setGithubLoading(true)
      setOauthError(null) // Clear any previous errors
      const redirectTo = getRedirectTo()
      const callbackUrl = new URL('/auth/callback', window.location.origin)
      if (redirectTo) {
        callbackUrl.searchParams.set('next', redirectTo)
      }

      await signInWithOAuth('github', {
        redirectTo: callbackUrl.toString(),
      })
    } catch (err) {
      console.error('GitHub sign-in failed:', err)
      setGithubLoading(false)
      setOauthError('Failed to sign in with GitHub. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome to VibeContext
          </CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          {oauthError && (
            <Alert variant="destructive">
              <AlertDescription>{oauthError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full"
              disabled={loading || googleLoading || githubLoading}
            >
              {googleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              {googleLoading
                ? 'Signing in with Google...'
                : 'Continue with Google'}
            </Button>

            <Button
              onClick={handleGithubSignIn}
              variant="outline"
              className="w-full"
              disabled={loading || googleLoading || githubLoading}
            >
              {githubLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Github className="mr-2 h-4 w-4" />
              )}
              {githubLoading
                ? 'Signing in with GitHub...'
                : 'Continue with GitHub'}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
