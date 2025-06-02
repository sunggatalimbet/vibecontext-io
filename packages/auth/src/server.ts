/**
 * @file: server.ts
 * @description: Server-side authentication implementation for SSR and API routes
 * @dependencies: @supabase/ssr, @supabase/supabase-js
 * @created: 2024-12-19
 */

import { createServerClient } from '@supabase/ssr'
import { SupabaseClient, User, Session } from '@supabase/supabase-js'
import { AuthConfig, ServerAuthOptions } from './types'

export class AuthServer {
  private config: AuthConfig
  private cookieAdapter?: ServerAuthOptions['request']

  constructor(options: ServerAuthOptions) {
    this.config = options.config
    this.cookieAdapter = options.request

    if (!this.config.supabaseUrl || !this.config.supabaseAnonKey) {
      throw new Error(
        'Missing required Supabase configuration: supabaseUrl and supabaseAnonKey'
      )
    }
  }

  private createSupabaseClient(): SupabaseClient {
    if (!this.cookieAdapter) {
      // Fallback for environments without cookie support
      return createServerClient(
        this.config.supabaseUrl,
        this.config.supabaseAnonKey,
        {
          cookies: {
            getAll: () => [],
            setAll: () => {},
          },
        }
      )
    }

    return createServerClient(
      this.config.supabaseUrl,
      this.config.supabaseAnonKey,
      {
        cookies: {
          getAll: () => this.cookieAdapter!.cookies.getAll(),
          setAll: cookiesToSet => {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                this.cookieAdapter!.cookies.set(name, value, options)
              })
            } catch (error) {
              // Handle cookie setting errors gracefully
              console.warn('Failed to set auth cookies:', error)
            }
          },
        },
      }
    )
  }

  public async getUser(): Promise<{ user: User | null; error: any }> {
    try {
      const supabase = this.createSupabaseClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      return { user, error }
    } catch (error) {
      console.error('Error getting user:', error)
      return { user: null, error }
    }
  }

  public async getSession(): Promise<{ session: Session | null; error: any }> {
    try {
      const supabase = this.createSupabaseClient()
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      return { session, error }
    } catch (error) {
      console.error('Error getting session:', error)
      return { session: null, error }
    }
  }

  public async exchangeCodeForSession(code: string): Promise<{ error: any }> {
    try {
      const supabase = this.createSupabaseClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      return { error }
    } catch (error) {
      console.error('Error exchanging code for session:', error)
      return { error }
    }
  }

  public async signOut(): Promise<{ error: any }> {
    try {
      const supabase = this.createSupabaseClient()
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error('Error signing out:', error)
      return { error }
    }
  }

  public async refreshSession(): Promise<{
    session: Session | null
    error: any
  }> {
    try {
      const supabase = this.createSupabaseClient()
      const {
        data: { session },
        error,
      } = await supabase.auth.refreshSession()
      return { session, error }
    } catch (error) {
      console.error('Error refreshing session:', error)
      return { session: null, error }
    }
  }

  public getSupabaseClient(): SupabaseClient {
    return this.createSupabaseClient()
  }
}

export function createAuthServer(options: ServerAuthOptions): AuthServer {
  return new AuthServer(options)
}

// Utility functions for common server auth patterns
export function createAuthConfig(
  env: Record<string, string | undefined>
): AuthConfig {
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL
  const supabaseAnonKey =
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  }
}
