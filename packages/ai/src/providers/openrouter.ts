import {
  createOpenRouter,
  type OpenRouterProvider,
} from '@openrouter/ai-sdk-provider'
import { db, initDatabaseConnection, messages } from '@repo/db'
import { Message, smoothStream, streamText } from 'ai'
import { chatSystemPrompt } from '../prompts'

interface StreamMessageParams {
  chatId: string
  allMessages: Array<Message>
}
class OpenRouter {
  private apiKey: string | undefined
  private systemPrompt: string
  private provider: OpenRouterProvider

  constructor() {
    this.apiKey = process.env.OPEN_ROUTER_PROJECT_IDEA_CHAT_KEY
    this.systemPrompt = chatSystemPrompt
    this.provider = createOpenRouter({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: this.apiKey,
    })
  }

  streamMessage({ allMessages, chatId }: StreamMessageParams) {
    const message = streamText({
      model: this.provider.chat('anthropic/claude-3.5-haiku'),
      system: this.systemPrompt,
      messages: allMessages,
      //   experimental_transform: smoothStream(),
      onError: ({ error }) => {
        console.error(error)
      },
      async onFinish({ response }) {
        await initDatabaseConnection()
        const message = response.messages[0]
        const role = 'assistant'
        const content = (message.content[0] as { text: string }).text

        await db.insert(messages).values({
          conversationId: chatId,
          role: role,
          content: content,
        })
      },
    })

    return message
  }
}

export const openRouter = new OpenRouter()
