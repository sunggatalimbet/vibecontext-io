/**
 * @file: page.tsx
 * @description: Root landing page that redirects based on authentication status
 * @dependencies: @repo/auth
 * @created: 2025-01-07
 */

import { redirect } from 'next/navigation'
import { getUserAction } from '@repo/auth'

export default async function LandingPage() {
  const user = await getUserAction()

  if (user) {
    // User is authenticated, redirect to dashboard
    redirect('/dashboard')
  } else {
    // User is not authenticated, redirect to login
    redirect('/auth/login')
  }
}
