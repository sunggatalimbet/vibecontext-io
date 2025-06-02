# @repo/auth

A reusable authentication package built on top of Supabase Auth. This package provides platform-agnostic authentication that can be used across web applications, mobile apps, CLI tools, and any JavaScript/TypeScript environment.

## Features

- 🔐 **OAuth Authentication** - Support for Google, GitHub, and other providers
- 🌐 **Platform Agnostic** - Works in browser, Node.js, React Native, etc.
- ⚛️ **React Integration** - Ready-to-use hooks and providers
- 🔄 **Session Management** - Automatic token refresh and persistence
- 🍪 **SSR Support** - Server-side rendering with cookie handling
- 📦 **TypeScript** - Full type safety and IntelliSense
- 🎯 **Modular** - Import only what you need

## Installation

```bash
pnpm add @repo/auth
```

## Environment Variables

Set up these environment variables in your application:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Usage

### React Applications

#### 1. Set up the AuthProvider

```tsx
import { AuthProvider } from '@repo/auth/react'
import { createAuthConfig } from '@repo/auth/server'

function App() {
  const authConfig = createAuthConfig(process.env)

  return (
    <AuthProvider config={authConfig}>
      <YourApp />
    </AuthProvider>
  )
}
```

#### 2. Use the useAuth hook

```tsx
import { useAuth } from '@repo/auth/react'

function LoginButton() {
  const { user, signInWithOAuth, signOut, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}!</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    )
  }

  return (
    <button onClick={() => signInWithOAuth('google')}>
      Sign in with Google
    </button>
  )
}
```

### Next.js API Routes

```tsx
import { cookies } from 'next/headers'
import { createAuthServer, createAuthConfig } from '@repo/auth/server'

export async function GET() {
  const cookieStore = await cookies()
  const authConfig = createAuthConfig(process.env)

  const authServer = createAuthServer({
    config: authConfig,
    request: {
      cookies: {
        getAll: () => cookieStore.getAll(),
        set: (name, value, options) => cookieStore.set(name, value, options),
      },
    },
  })

  const { user, error } = await authServer.getUser()

  if (error || !user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return Response.json({ user })
}
```

### Vanilla JavaScript/TypeScript

```typescript
import { createAuthClient } from '@repo/auth/client'

const authClient = createAuthClient({
  config: {
    supabaseUrl: 'your_supabase_url',
    supabaseAnonKey: 'your_supabase_anon_key',
  },
  onAuthStateChange: event => {
    console.log('Auth event:', event.type, event.user?.email)
  },
})

// Sign in with OAuth
await authClient.signInWithOAuth('google')

// Get current state
const { user, session, loading, error } = authClient.getState()

// Sign out
await authClient.signOut()
```

### Node.js/Server Environments

```typescript
import { createAuthServer } from '@repo/auth/server'

const authServer = createAuthServer({
  config: {
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY!,
  },
})

// Get user from session
const { user, error } = await authServer.getUser()

// Exchange OAuth code for session
const { error: exchangeError } = await authServer.exchangeCodeForSession(code)
```

## API Reference

### Core Types

```typescript
interface AuthConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  redirectTo?: string
  autoRefreshToken?: boolean
  persistSession?: boolean
  detectSessionInUrl?: boolean
}

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: AuthError | null
}

type OAuthProvider = 'google' | 'github' | 'gitlab' | 'bitbucket' | 'discord'
```

### AuthClient (Browser)

```typescript
class AuthClient {
  constructor(options: AuthClientOptions)

  // Methods
  signInWithOAuth(
    provider: OAuthProvider,
    options?: OAuthOptions
  ): Promise<void>
  signOut(): Promise<void>
  refreshSession(): Promise<void>
  clearError(): void
  getState(): AuthState
  onAuthStateChange(callback: AuthEventCallback): () => void
  getSupabaseClient(): SupabaseClient
  destroy(): void
}
```

### AuthServer (Server)

```typescript
class AuthServer {
  constructor(options: ServerAuthOptions)

  // Methods
  getUser(): Promise<{ user: User | null; error: any }>
  getSession(): Promise<{ session: Session | null; error: any }>
  exchangeCodeForSession(code: string): Promise<{ error: any }>
  signOut(): Promise<{ error: any }>
  refreshSession(): Promise<{ session: Session | null; error: any }>
  getSupabaseClient(): SupabaseClient
}
```

### React Hooks

```typescript
// Main auth hook
function useAuth(): AuthContextType

// Direct client access (advanced)
function useAuthClient(options: UseAuthClientOptions): AuthClient | null
```

## Package Exports

- `@repo/auth` - Core types and utilities
- `@repo/auth/client` - Browser-side authentication
- `@repo/auth/server` - Server-side authentication
- `@repo/auth/react` - React hooks and providers

## Examples

### Next.js Middleware

```typescript
import { NextResponse, type NextRequest } from 'next/server'
import { createAuthServer, createAuthConfig } from '@repo/auth/server'

export async function middleware(request: NextRequest) {
  const authConfig = createAuthConfig(process.env)
  const authServer = createAuthServer({
    config: authConfig,
    request: {
      cookies: {
        getAll: () => request.cookies.getAll(),
        set: (name, value, options) => {
          // Handle cookie setting
        },
      },
    },
  })

  const { user } = await authServer.getUser()

  if (!user && request.nextUrl.pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
```

### OAuth Callback Handler

```typescript
import { createAuthServer, createAuthConfig } from '@repo/auth/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return Response.redirect('/login?error=no_code')
  }

  const authServer = createAuthServer({
    config: createAuthConfig(process.env),
  })

  const { error } = await authServer.exchangeCodeForSession(code)

  if (error) {
    return Response.redirect('/login?error=auth_failed')
  }

  return Response.redirect('/')
}
```

## Contributing

This package is part of the VibeContext.io monorepo. To contribute:

1. Make changes to the package
2. Run `pnpm build` to build the package
3. Test in the web app or other consumers
4. Update documentation as needed

## License

Private package for VibeContext.io project.
