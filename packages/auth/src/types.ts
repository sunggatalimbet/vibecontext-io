/**
 * @file: types.ts
 * @description: Core types and interfaces for the auth package
 * @created: 2024-12-19
 */

import {
  User,
  Session,
  AuthError,
  AuthChangeEvent,
} from '@supabase/supabase-js'

export interface AuthConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  redirectTo?: string
  autoRefreshToken?: boolean
  persistSession?: boolean
  detectSessionInUrl?: boolean
}

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: AuthError | null
}

export interface AuthActions {
  signInWithOAuth: (
    provider: OAuthProvider,
    options?: OAuthOptions
  ) => Promise<void>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
  clearError: () => void
}

export interface AuthContextType extends AuthState, AuthActions {}

export type OAuthProvider =
  | 'google'
  | 'github'
  | 'gitlab'
  | 'bitbucket'
  | 'discord'

export interface OAuthOptions {
  redirectTo?: string
  scopes?: string
  queryParams?: Record<string, string>
}

export interface AuthEvent {
  type: AuthChangeEvent
  session: Session | null
  user: User | null
  error?: AuthError
}

export type AuthEventCallback = (event: AuthEvent) => void

export interface AuthClientOptions {
  config: AuthConfig
  onAuthStateChange?: AuthEventCallback
}

export interface ServerAuthOptions {
  config: AuthConfig
  request?: {
    cookies: {
      getAll(): Array<{ name: string; value: string }>
      set(name: string, value: string, options?: any): void
    }
  }
}
