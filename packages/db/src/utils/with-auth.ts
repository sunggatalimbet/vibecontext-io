import 'server-only'
import type { User } from '@supabase/supabase-js'
import { AuthenticationError } from '../errors'
import { getAuthUser } from './get-auth-user'

export async function withAuth<T>(
  operation: (user: User) => Promise<T>
): Promise<T> {
  try {
    const user = await getAuthUser()
    return await operation(user)
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      throw new AuthenticationError(
        'You must be signed in to perform this action'
      )
    }
    throw error
  }
}

export type AuthenticatedOperation<T> = (user: User) => Promise<T>
