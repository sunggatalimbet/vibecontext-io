import { openRouter } from '@repo/ai'
import {
  getConversationById,
  createUserConversation,
  createConversationMessage,
  getConversationMessages,
  getErrorDetails,
  type DataResponse,
} from '@repo/db'
import { appendClientMessage } from 'ai'
import { chatSchema } from '@/lib/schemas'
import { MAX_USER_MESSAGES } from '@/shared/lib/constants'

export const maxDuration = 30

export async function POST(req: Request): Promise<Response> {
  try {
    const data = chatSchema.parse(await req.json())
    const messageContent = data.message.content
    const conversationId = data.id

    // Check if conversation exists, create if it doesn't
    try {
      await getConversationById(conversationId)
    } catch {
      // Conversation doesn't exist, create it
      await createUserConversation()
    }

    // Get previous messages
    const prevMessages = await getConversationMessages(conversationId)

    // Create new user message
    const newMessage = await createConversationMessage({
      conversationId,
      role: 'user',
      content: messageContent,
    })

    const userMessageCount =
      prevMessages.filter(m => m.role === 'user').length + 1

    // If this is the max user message, don't generate AI response
    if (userMessageCount >= MAX_USER_MESSAGES) {
      const response: DataResponse<{
        message: string
        userMessageCount: number
        isCompleted: boolean
      }> = {
        success: true,
        data: {
          message:
            'Thank you for answering all questions! Discovery phase completed, now with extended context we can generate accurate project overview and project documentation',
          userMessageCount,
          isCompleted: true,
        },
      }

      return Response.json(response, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const allMessages = appendClientMessage({
      messages: prevMessages,
      message: newMessage,
    })

    const message = openRouter.streamMessage({
      conversationId,
      allMessages: allMessages,
    })

    void message.consumeStream()

    return message.toDataStreamResponse()
  } catch (err) {
    console.error('Chat API error:', err)

    const errorDetails = getErrorDetails(err)

    const errorResponse: DataResponse<never> = {
      success: false,
      error: {
        message: errorDetails.message,
        code: errorDetails.code,
        statusCode: errorDetails.statusCode,
      },
    }

    return Response.json(errorResponse, {
      status: errorDetails.statusCode,
    })
  }
}
