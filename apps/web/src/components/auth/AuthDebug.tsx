/**
 * @file: AuthDebug.tsx
 * @description: Debug component to display authentication status
 * @dependencies: @repo/auth/react
 * @created: 2025-01-06
 */

'use client'

import { useAuth } from '@repo/auth/react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AuthDebug() {
  const { user, session, loading, error } = useAuth()

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm">Auth Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">Loading...</Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">Auth Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={user ? 'default' : 'secondary'}>
            {user ? 'Signed In' : 'Not Signed In'}
          </Badge>
        </div>

        {user && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Email:</span>
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Provider:</span>
              <span className="text-sm">
                {user.app_metadata?.provider || 'Unknown'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">User ID:</span>
              <span className="text-sm font-mono text-xs">{user.id}</span>
            </div>
          </>
        )}

        {error && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Error:</span>
            <span className="text-sm text-destructive">{error.message}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
