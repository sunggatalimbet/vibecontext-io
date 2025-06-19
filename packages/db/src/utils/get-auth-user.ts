import 'server-only'
import { createClientServer } from '@repo/auth'
import type { User } from '@supabase/supabase-js'
import { AuthenticationError } from '../errors'

/**
 * Retrieves and validates the authenticated user for database operations.
 * Throws authentication errors if user is not properly authenticated.
 *
 * @returns Promise<User> - The authenticated user
 * @throws {AuthenticationError} - When authentication fails
 */

export const getAuthUser = async (): Promise<User> => {
  try {
    const supabase = await createClientServer()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      throw new AuthenticationError(
        'You must be signed in to perform this action'
      )
    }

    if (!user) {
      throw new AuthenticationError(
        'You must be signed in to perform this action'
      )
    }

    return user
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }

    throw new AuthenticationError(
      'An unexpected error occurred during authentication'
    )
  }
}
