/**
 * @file: index.ts
 * @description: Main exports for the auth package
 * @created: 2024-12-19
 */

// Core types
export * from './types'

// Client-side auth
export { AuthClient, createAuthClient } from './client'

// Server-side auth
export { AuthServer, createAuthServer, createAuthConfig } from './server'

// React integration (conditional export)
export type { AuthProviderProps } from './react/AuthProvider'
