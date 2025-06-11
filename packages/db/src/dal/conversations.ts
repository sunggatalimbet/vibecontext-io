'use server'

import { eq } from 'drizzle-orm'
import { db } from '../client'
import { Conversation, conversations } from '../schema'
import { initDatabaseConnection } from '../utils'

export async function getUserConversations(): Promise<Array<Conversation>> {
  const user = await initDatabaseConnection()

  const userConversations = await db
    .select()
    .from(conversations)
    .where(eq(conversations.userId, user.id))

  return userConversations
}
