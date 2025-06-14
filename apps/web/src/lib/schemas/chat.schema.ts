import { z } from 'zod'

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  parts: z.array(z.object({ type: z.string() })),
})

export const chatSchema = z.object({
  id: z.string(),
  message: chatMessageSchema,
})
