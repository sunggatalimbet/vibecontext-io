import { openRouter } from '@repo/ai'
import { db, initDatabaseConnection, messages, conversations } from '@repo/db'
import { appendClientMessage } from 'ai'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { chatSchema } from '@/lib/schemas'
import { MAX_USER_MESSAGES } from '@/shared/lib/constants'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const user = await initDatabaseConnection()

    const data = chatSchema.parse(await req.json())
    const messageContent = data.message.content
    const chatId = data.id

    // If there is not previous messages create new conversation
    const prevMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, chatId))
      .orderBy(messages.createdAt)

    if (prevMessages.length === 0) {
      await db.insert(conversations).values({
        id: chatId,
        userId: user.id,
        title: 'New Project',
      })
    }

    // Add new message to the  conversation
    const [newMessage] = await db
      .insert(messages)
      .values({
        conversationId: chatId,
        role: 'user',
        content: messageContent,
      })
      .returning()

    // Count user messages including the new one
    const userMessageCount =
      prevMessages.filter(m => m.role === 'user').length + 1

    // If this is the 6th user message, don't generate AI response
    if (userMessageCount >= MAX_USER_MESSAGES) {
      // Return a simple response without streaming AI content
      return new Response(
        JSON.stringify({
          message:
            'Thank you for answering all questions! Discovery phase completed, now with extended context we can generate accurate project overview and project documentation',
          userMessageCount,
          isCompleted: true,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

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
