/**
 * @file: client.ts
 * @description: Client-side authentication implementation for browser environments
 * @dependencies: @supabase/supabase-js
 * @created: 2024-12-19
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import {
  AuthConfig,
  AuthState,
  OAuthProvider,
  OAuthOptions,
  AuthEvent,
  AuthEventCallback,
  AuthClientOptions,
} from './types'

export class AuthClient {
  private supabase: SupabaseClient
  private config: AuthConfig
  private state: AuthState
  private listeners: Set<AuthEventCallback>

  constructor(options: AuthClientOptions) {
    this.config = {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      ...options.config,
    }

    if (!this.config.supabaseUrl || !this.config.supabaseAnonKey) {
      throw new Error(
        'Missing required Supabase configuration: supabaseUrl and supabaseAnonKey'
      )
    }

    this.supabase = createClient(
      this.config.supabaseUrl,
      this.config.supabaseAnonKey,
      {
        auth: {
          autoRefreshToken: this.config.autoRefreshToken,
          persistSession: this.config.persistSession,
          detectSessionInUrl: this.config.detectSessionInUrl,
        },
      }
    )

    this.state = {
      user: null,
      session: null,
      loading: true,
      error: null,
    }

    this.listeners = new Set()

    if (options.onAuthStateChange) {
      this.listeners.add(options.onAuthStateChange)
    }

    this.init()
  }

  private async init() {
    try {
      // Get initial session
      const {
        data: { session },
        error,
      } = await this.supabase.auth.getSession()

      if (error) {
        this.updateState({ error })
      } else {
        this.updateState({
          session,
          user: session?.user ?? null,
          error: null,
        })
      }
    } catch (err) {
      console.error('Error getting initial session:', err)
      this.updateState({ error: err as any })
    } finally {
      this.updateState({ loading: false })
    }

    // Listen for auth state changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      const authEvent: AuthEvent = {
        type: event as AuthEvent['type'],
        session,
        user: session?.user ?? null,
      }

      this.updateState({
        session,
        user: session?.user ?? null,
        loading: false,
        error: null,
      })

      this.notifyListeners(authEvent)
    })
  }

  private updateState(updates: Partial<AuthState>) {
    this.state = { ...this.state, ...updates }
  }

  private notifyListeners(event: AuthEvent) {
    this.listeners.forEach(listener => {
      try {
        listener(event)
      } catch (err) {
        console.error('Error in auth state listener:', err)
      }
    })
  }

  public getState(): AuthState {
    return { ...this.state }
  }

  public async signInWithOAuth(
    provider: OAuthProvider,
    options?: OAuthOptions
  ): Promise<void> {
    try {
      this.updateState({ loading: true, error: null })

      const { error } = await this.supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: options?.redirectTo || this.config.redirectTo,
          scopes: options?.scopes,
          queryParams: options?.queryParams,
        },
      })

      if (error) {
        this.updateState({ error, loading: false })
        throw error
      }
    } catch (err) {
      console.error(`Error signing in with ${provider}:`, err)
      this.updateState({ loading: false })
      throw err
    }
  }

  public async signOut(): Promise<void> {
    try {
      this.updateState({ loading: true, error: null })

      const { error } = await this.supabase.auth.signOut()

      if (error) {
        this.updateState({ error, loading: false })
        throw error
      }
    } catch (err) {
      console.error('Error signing out:', err)
      this.updateState({ loading: false })
      throw err
    }
  }

  public async refreshSession(): Promise<void> {
    try {
      this.updateState({ loading: true, error: null })

      const { error } = await this.supabase.auth.refreshSession()

      if (error) {
        this.updateState({ error, loading: false })
        throw error
      }
    } catch (err) {
      console.error('Error refreshing session:', err)
      this.updateState({ loading: false })
      throw err
    }
  }

  public clearError(): void {
    this.updateState({ error: null })
  }

  public onAuthStateChange(callback: AuthEventCallback): () => void {
    this.listeners.add(callback)

    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback)
    }
  }

  public getSupabaseClient(): SupabaseClient {
    return this.supabase
  }

  public destroy(): void {
    this.listeners.clear()
  }
}

export function createAuthClient(options: AuthClientOptions): AuthClient {
  return new AuthClient(options)
}
