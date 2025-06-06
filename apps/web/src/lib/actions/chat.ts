'use server'

import { redirect } from 'next/navigation'
import { createClientServer } from '@repo/auth'
import { db, conversations } from '@repo/db'

export async function createChat() {
  const supabase = await createClientServer()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw Error('Authentication required')
  }

  const [response] = await db
    .insert(conversations)
    .values({
      userId: user.id,
      title: 'New Project',
    })
    .returning({
      id: conversations.id,
    })

  redirect(`/projects/${response.id}`)
}
