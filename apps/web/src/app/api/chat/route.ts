import { openRouter } from '@repo/ai'
import { z } from 'zod'

export const maxDuration = 30

const chatMessageSchema = z.object({
  role: z.string(),
  content: z.string(),
  parts: z.array(z.object({ type: z.string() })),
})

const chatSchema = z.object({
  id: z.string(),
  messages: z.array(chatMessageSchema).min(1),
})

export async function POST(req: Request) {
  try {
    const data = chatSchema.parse(await req.json())
    const lastMessage =
      data.messages.length === 1 ? 0 : data.messages.length - 1

    const userPrompt = data.messages[lastMessage].content
    const message = openRouter.streamMessage(userPrompt)
    return message.toDataStreamResponse()
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: err.errors }, { status: 400 })
    } else if (typeof err === 'string') {
      return Response.json({ error: err }, { status: 400 })
    } else {
      console.dir(err)
      return Response.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
}
