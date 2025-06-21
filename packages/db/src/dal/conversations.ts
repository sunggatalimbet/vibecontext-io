import 'server-only'
import { eq, and, desc } from 'drizzle-orm'
import { db } from '../client'
import {
  ResourceAccessDeniedError,
  InvalidInputError,
  ResourceNotFoundError,
} from '../errors'
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
    const conversationsData: Array<ConversationOmitUserId> = await db
      .select({
        id: conversations.id,
        title: conversations.title,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,
      })
      .from(conversations)
      .where(eq(conversations.userId, user.id))
      .orderBy(desc(conversations.updatedAt))

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
  if (!conversationData) {
    throw new ResourceNotFoundError('Conversation', conversationId)
  }
  return conversationData
}

export async function getConversationMessages(
  conversationId: string
): Promise<Array<Message>> {
  return await withAuth(async user => {
    const result = await db
      .select({ id: conversations.id })
      .from(conversations)
      .where(
        and(
          eq(conversations.id, conversationId),
          eq(conversations.userId, user.id)
        )
      )

    if (result.length === 0) {
      throw new ResourceAccessDeniedError('Conversation', conversationId)
    }

    const conversation = result[0]

    return await db
      .select()
      .from(messages)
      .where(and(eq(messages.conversationId, conversation.id)))
  })
}

export type CreateConversationMessageDTO = {
  conversationId: string
  role: 'user' | 'assistant'
  content: string
}

export async function createConversationMessage({
  conversationId,
  role,
  content,
}: CreateConversationMessageDTO) {
  return withAuth(async user => {
    // Validate input
    if (!conversationId.trim()) {
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
        and(
          eq(conversations.id, conversationId),
          eq(conversations.userId, user.id)
        )
      )

    if (conversation.length === 0) {
      throw new ResourceAccessDeniedError('Conversation', conversationId)
    }

    // Now safe to create the message
    const [message] = await db
      .insert(messages)
      .values({
        conversationId,
        role: role,
        content: content.trim(),
      })
      .returning()

    return message
  })
}

export async function deleteConversation(
  conversationId: string
): Promise<{ id: string; title: string }> {
  return withAuth(async user => {
    if (!conversationId.trim()) {
      throw new InvalidInputError('chatId', 'Conversation ID is required')
    }

    const conversation = await db
      .select({ id: conversations.id, title: conversations.title })
      .from(conversations)
      .where(
        and(
          eq(conversations.id, conversationId),
          eq(conversations.userId, user.id)
        )
      )

    if (conversation.length === 0) {
      throw new ResourceAccessDeniedError('Conversation', conversationId)
    }

    // Now safe to delete the conversation
    await db
      .delete(conversations)
      .where(
        and(
          eq(conversations.id, conversationId),
          eq(conversations.userId, user.id)
        )
      )

    return conversation[0]
  })
}
