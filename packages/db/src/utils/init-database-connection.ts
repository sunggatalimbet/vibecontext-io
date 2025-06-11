import { createClientServer } from '@repo/auth'
import type { User } from '@supabase/supabase-js'

export const initDatabaseConnection = async (): Promise<User> => {
  const supabase = await createClientServer()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError) {
    throw Error('Authentication required')
  }

  if (!user) {
    throw Error('Authentication required')
  }

  return user
}
