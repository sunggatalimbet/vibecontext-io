/**
 * @file: page.tsx
 * @description: Login page with OAuth authentication options
 * @dependencies: @repo/auth, shadcn/ui components
 * @created: 2024-12-19
 */

import { signInWithGoogleAction, signInWithGithubAction } from '@repo/auth'
import { LoginButton } from '@/components/auth/login-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome to vibe-context.io
          </CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <LoginButton signInAction={signInWithGoogleAction} />
            <LoginButton signInAction={signInWithGithubAction} />
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
