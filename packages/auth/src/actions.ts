'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { type User } from '@supabase/supabase-js'
import { createClient } from './server'

export async function signInWithGoogleAction() {
  return signInWithAction('google')
}

export async function signInWithGithubAction() {
  return signInWithAction('github')
}

export async function signInWithAction(provider: 'google' | 'github') {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get('origin') || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('OAuth error:', error)
    return redirect('/auth/error?message=' + encodeURIComponent(error.message))
  }

  if (data.url) {
    return redirect(data.url)
  }
}

export async function signOutAction() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Sign out error:', error)
    return redirect('/auth/error?message=' + encodeURIComponent(error.message))
  }

  return redirect('/auth/login')
}

export async function getUserAction(): Promise<User | null> {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error('Get user error:', error)
    return null
  }

  return user
}
