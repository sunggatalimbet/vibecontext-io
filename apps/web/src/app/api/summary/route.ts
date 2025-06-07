import { openRouter } from '@repo/ai'
import { db, initDatabaseConnection, messages } from '@repo/db'
import { convertToCoreMessages } from 'ai'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const maxDuration = 30

const summaryRequestSchema = z.object({
  chatId: z.string(),
})

export async function POST(req: Request) {
  try {
    await initDatabaseConnection()

    const data = summaryRequestSchema.parse(await req.json())
    const { chatId } = data

    const chatMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, chatId))
      .orderBy(messages.createdAt)

    if (chatMessages.length === 0) {
      return Response.json({ error: 'No messages found' }, { status: 400 })
    }

    const coreMessages = convertToCoreMessages(chatMessages)

    const summary = openRouter.streamSummary({
      chatId,
      chatMessages: coreMessages,
    })

    return summary.toTextStreamResponse()
  } catch (err) {
    console.error(err)

    if (err instanceof z.ZodError) {
      return Response.json({ error: err.errors }, { status: 400 })
    } else if (typeof err === 'string') {
      return Response.json({ error: err }, { status: 400 })
    } else {
      console.error(err)
      return Response.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
}
