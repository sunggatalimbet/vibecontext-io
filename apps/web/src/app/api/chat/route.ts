import { openRouter } from '@repo/ai'
import { db, initDatabaseConnection, messages } from '@repo/db'
import { appendClientMessage } from 'ai'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { chatSchema } from '@/lib/schemas'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    await initDatabaseConnection()

    const data = chatSchema.parse(await req.json())
    const messageContent = data.message.content
    const chatId = data.id

    const prevMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, chatId))
      .orderBy(messages.createdAt)

    const [newMessage] = await db
      .insert(messages)
      .values({
        conversationId: chatId,
        role: 'user',
        content: messageContent,
      })
      .returning()

    const allMessages = appendClientMessage({
      messages: prevMessages,
      message: newMessage,
    })

    const message = openRouter.streamMessage({
      chatId,
      allMessages: allMessages,
    })

    void message.consumeStream()

    return message.toDataStreamResponse()
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
