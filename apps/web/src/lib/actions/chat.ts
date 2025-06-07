'use server'

import { redirect } from 'next/navigation'
import { db, conversations, messages, initDatabaseConnection } from '@repo/db'
import { and, eq } from 'drizzle-orm'

export async function createChat() {
  const user = await initDatabaseConnection()

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

export async function getChat(chatId: string) {
  const user = await initDatabaseConnection()

  const [chat] = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.id, chatId), eq(conversations.userId, user.id)))

  return chat
}

export async function getChatMessages(chatId: string) {
  await initDatabaseConnection()

  const chatMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, chatId))
    .orderBy(messages.createdAt)

  return chatMessages
}
