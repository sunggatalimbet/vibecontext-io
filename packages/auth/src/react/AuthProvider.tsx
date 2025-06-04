'use client'

/**
 * @file: AuthProvider.tsx
 * @description: React context provider for authentication state management
 * @dependencies: React, AuthClient
 * @created: 2024-12-19
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { AuthClient, createAuthClient } from '../client'
import {
  AuthContextType,
  AuthConfig,
  AuthState,
  OAuthProvider,
  OAuthOptions,
} from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export interface AuthProviderProps {
  children: React.ReactNode
  config: AuthConfig
}

export const AuthProvider = ({ children, config }: AuthProviderProps) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const client = createAuthClient({
      config,
      onAuthStateChange: event => {
        console.log('Auth event:', event.type, event.user?.email)
        setAuthState(client.getState())
      },
    })

    setAuthClient(client)

    // Update state with initial client state
    setAuthState(client.getState())

    return () => {
      client.destroy()
    }
  }, [config.supabaseUrl, config.supabaseAnonKey])

  const signInWithOAuth = useCallback(
    async (provider: OAuthProvider, options?: OAuthOptions) => {
      if (!authClient) {
        throw new Error('Auth client not initialized')
      }
      await authClient.signInWithOAuth(provider, options)
    },
    [authClient]
  )

  const signOut = useCallback(async () => {
    if (!authClient) {
      throw new Error('Auth client not initialized')
    }
    await authClient.signOut()
  }, [authClient])

  const refreshSession = useCallback(async () => {
    if (!authClient) {
      throw new Error('Auth client not initialized')
    }
    await authClient.refreshSession()
  }, [authClient])

  const clearError = useCallback(() => {
    if (!authClient) {
      return
    }
    authClient.clearError()
    setAuthState(authClient.getState())
  }, [authClient])

  const contextValue: AuthContextType = {
    ...authState,
    signInWithOAuth,
    signOut,
    refreshSession,
    clearError,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
