import { openRouter } from '@repo/ai'
import {
  getConversationMessages,
  getErrorDetails,
  type DataResponse,
} from '@repo/db'
import { convertToCoreMessages } from 'ai'
import { z } from 'zod'

export const maxDuration = 30

const summaryRequestSchema = z.object({
  chatId: z.string(),
})

export async function POST(req: Request): Promise<Response> {
  try {
    const data = summaryRequestSchema.parse(await req.json())
    const { chatId } = data

    const chatMessages = await getConversationMessages(chatId)

    if (chatMessages.length === 0) {
      const errorResponse: DataResponse<never> = {
        success: false,
        error: {
          message: 'No messages found',
          code: 'NO_MESSAGES',
          statusCode: 400,
        },
      }
      return Response.json(errorResponse, { status: 400 })
    }

    const coreMessages = convertToCoreMessages(chatMessages)

    const summary = openRouter.streamSummary({
      chatId,
      chatMessages: coreMessages,
    })

    return summary.toTextStreamResponse()
  } catch (err) {
    console.error('Summary API error:', err)

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
