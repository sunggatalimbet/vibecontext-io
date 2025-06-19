import 'server-only'
import { eq, and } from 'drizzle-orm'
import { db } from '../client'
import { ResourceAccessDeniedError, InvalidInputError } from '../errors'
import {
  ConversationOmitUserId,
  conversations,
  Message,
  messages,
} from '../schema'
import { withAuth } from '../utils'

export async function getUserConversations(): Promise<
  Array<ConversationOmitUserId>
> {
  return withAuth(async user => {
    const conversationsData = await db
      .select({
        id: conversations.id,
        title: conversations.title,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,
      })
      .from(conversations)
      .where(eq(conversations.userId, user.id))

    return conversationsData
  })
}

export async function createUserConversation(): Promise<string> {
  const [response] = await withAuth(async user => {
    return await db
      .insert(conversations)
      .values({
        userId: user.id,
        title: 'New Project',
      })
      .returning({
        id: conversations.id,
      })
  })

  return response.id
}

export async function getConversationById(
  conversationId: string
): Promise<ConversationOmitUserId> {
  const response = await withAuth(async user => {
    return await db
      .select({
        id: conversations.id,
        title: conversations.title,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,
      })
      .from(conversations)
      .where(
        and(
          eq(conversations.userId, user.id),
          eq(conversations.id, conversationId)
        )
      )
  })

  const conversationData = response[0]
  return conversationData
}

export async function getConversationMessages(
  conversationId: string
): Promise<Array<Message>> {
  return await withAuth(async user => {
    return await db
      .select()
      .from(messages)
      .where(and(eq(messages.conversationId, conversationId)))
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
    if (!chatId.trim()) {
      throw new InvalidInputError('chatId', 'Conversation ID is required')
    }

    if (!content.trim()) {
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
    const [message] = await db
      .insert(messages)
      .values({
        conversationId: chatId,
        role: role,
        content: content.trim(),
      })
      .returning()

    return message
  })
}
