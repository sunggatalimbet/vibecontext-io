'use server'

import { createStreamableValue } from 'ai/rsc'
import { openRouter } from '../providers'

export async function generateStreamMessage(userPrompt: string) {
  const stream = createStreamableValue('')
  const message = openRouter.streamMessage(userPrompt)

  for await (const chunk of message.textStream) {
    stream.update(chunk)
  }

  stream.done()

  return { streamMessage: stream.value }
}
