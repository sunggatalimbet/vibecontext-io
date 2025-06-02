/**
 * @file: index.ts
 * @description: Main exports for the auth package
 * @created: 2024-12-19
 */

// Core types and configurations
export * from './types'

// Client-side auth
export { AuthClient, createAuthClient } from './client'

// Server-side auth
export { AuthServer, createAuthServer, createAuthConfig } from './server'

// React providers and hooks
export * from './react'

// Security utilities
export { validateRedirectUrl, sanitizeErrorMessage } from './utils/security'
