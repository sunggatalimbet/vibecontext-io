'use client'

/**
 * @file: useAuthClient.ts
 * @description: React hook for direct access to the auth client
 * @dependencies: React, AuthClient
 * @created: 2024-12-19
 */
import { useEffect, useRef } from 'react'
import { AuthClient, createAuthClient } from '../client'
import { AuthConfig, AuthEventCallback } from '../types'

export interface UseAuthClientOptions {
  config: AuthConfig
  onAuthStateChange?: AuthEventCallback
}

export function useAuthClient(
  options: UseAuthClientOptions
): AuthClient | null {
  const clientRef = useRef<AuthClient | null>(null)

  useEffect(() => {
    const client = createAuthClient(options)
    clientRef.current = client

    return () => {
      client.destroy()
      clientRef.current = null
    }
  }, [options.config.supabaseUrl, options.config.supabaseAnonKey])

  return clientRef.current
}
