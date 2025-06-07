import { createClientServer } from '@repo/auth'

export const initDatabaseConnection = async () => {
  const supabase = await createClientServer()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw Error('Authentication required')
  }

  return user
}
