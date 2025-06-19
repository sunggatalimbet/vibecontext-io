import 'server-only'
import type { User } from '@supabase/supabase-js'
import { getAuthUser } from './get-auth-user'

export async function withAuth<T>(
  operation: (user: User) => Promise<T>
): Promise<T> {
  const user = await getAuthUser()
  return await operation(user)
}

export type AuthenticatedOperation<T> = (user: User) => Promise<T>
