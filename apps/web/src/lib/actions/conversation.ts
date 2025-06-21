'use server'

import {
  getConversationById,
  getConversationMessages,
  getErrorDetails,
  createUserConversation,
  type DataResponse,
  type ConversationOmitUserId,
  type Message,
} from '@repo/db'

export async function createUserConversationAction(): Promise<
  DataResponse<{ id: string }>
> {
  try {
    const conversationId = await createUserConversation()
    return { success: true as const, data: { id: conversationId } }
  } catch (err) {
    const errorDetails = getErrorDetails(err)
    console.error('createUserConversationAction error:', errorDetails)

    return {
      success: false as const,
      error: {
        message: errorDetails.message,
        code: errorDetails.code,
        statusCode: errorDetails.statusCode,
      },
    }
  }
}

export async function getConversationByIdAction(
  conversationId: string
): Promise<DataResponse<ConversationOmitUserId>> {
  try {
    if (!conversationId || typeof conversationId !== 'string') {
      throw new Error('Invalid chat ID provided')
    }

    const conversationData = await getConversationById(conversationId)

    return { success: true, data: conversationData }
  } catch (err) {
    const errorDetails = getErrorDetails(err)
    console.error('getChat error:', errorDetails)

    return {
      success: false,
      error: {
        message: errorDetails.message,
        code: errorDetails.code,
        statusCode: errorDetails.statusCode,
      },
    }
  }
}

export async function getConversationMessagesAction(
  conversationId: string
): Promise<DataResponse<Array<Message>>> {
  try {
    if (!conversationId || typeof conversationId !== 'string') {
      throw new Error('Invalid chat ID provided')
    }

    const messages = await getConversationMessages(conversationId)
    return { success: true, data: messages }
  } catch (err) {
    const errorDetails = getErrorDetails(err)
    console.error('getConversationDataMessages error:', errorDetails)

    return {
      success: false,
      error: {
        message: errorDetails.message,
        code: errorDetails.code,
        statusCode: errorDetails.statusCode,
      },
    }
  }
}
