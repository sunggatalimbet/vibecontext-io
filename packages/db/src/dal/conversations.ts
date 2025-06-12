import 'server-only'
import { eq, and } from 'drizzle-orm'
import { db } from '../client'
import { ResourceAccessDeniedError, InvalidInputError } from '../errors'
import { Conversation, conversations, messages } from '../schema'
import { withAuth } from '../utils'

export async function getUserConversations(): Promise<Array<Conversation>> {
  return withAuth(async user => {
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, user.id))
  })
}

export type CreateConversationMessageDTO = {
  chatId: string
  role: 'user' | 'assistant'
  content: string
}

export async function createConversationMessage({
  chatId,
  role,
  content,
}: CreateConversationMessageDTO) {
  return withAuth(async user => {
    // Validate input
    if (!chatId?.trim()) {
      throw new InvalidInputError('chatId', 'Conversation ID is required')
    }

    if (!content?.trim()) {
      throw new InvalidInputError('content', 'Message content is required')
    }

    // Verify user owns this conversation
    const conversation = await db
      .select({ id: conversations.id })
      .from(conversations)
      .where(
        and(eq(conversations.id, chatId), eq(conversations.userId, user.id))
      )

    if (conversation.length === 0) {
      throw new ResourceAccessDeniedError('Conversation', chatId)
    }

    // Now safe to create the message
    return await db.insert(messages).values({
      conversationId: chatId,
      role: role,
      content: content.trim(),
    })
  })
}
