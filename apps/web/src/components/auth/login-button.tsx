/**
 * @file: page.tsx
 * @description: Client OAuth login button
 * @dependencies: @repo/auth, shadcn/ui components
 * @created: 2025-06-01
 */

'use client'

import { useState, useTransition } from 'react'
import { GithubIcon, GoogleIcon } from '@/shared/components/icons'

interface LoginButtonProps {
  signInAction: () => Promise<void>
  type: 'Google' | 'Github'
}

export function LoginButton({ signInAction, type }: LoginButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = () => {
    setError(null)
    startTransition(async () => {
      try {
        await signInAction()
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else if (typeof err === 'string') {
          setError(err)
        } else {
          console.error('Authentication error:', err)
          setError('Authentication failed. Please try again.')
        }
      }
    })
  }

  const icon = type === 'Github' ? <GithubIcon /> : <GoogleIcon />

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleSignIn}
        disabled={isPending}
        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          {icon}
        </span>

        {isPending ? 'Signing in...' : `Sign in with ${type}`}
      </button>
    </div>
  )
}
