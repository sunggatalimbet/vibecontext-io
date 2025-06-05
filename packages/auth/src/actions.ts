'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from './server'

export async function signInWithGoogleAction() {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get('origin') || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('OAuth error:', error)
    redirect('/auth/error?message=' + encodeURIComponent(error.message))
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signInWithGithubAction() {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get('origin') || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('OAuth error:', error)
    redirect('/auth/error?message=' + encodeURIComponent(error.message))
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signOutAction() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Sign out error:', error)
    redirect('/auth/error?message=' + encodeURIComponent(error.message))
  }

  redirect('/auth/login')
}

export async function getUserAction() {
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
