import {
  createOpenRouter,
  type OpenRouterProvider,
} from '@openrouter/ai-sdk-provider'
import { db, initDatabaseConnection, messages, projects } from '@repo/db'
import { summarySchema } from '@repo/web/src/lib/schemas'
import {
  CoreMessage,
  Message,
  smoothStream,
  streamObject,
  streamText,
} from 'ai'
import { chatSystemPrompt, summarySystemPrompt } from '../prompts'

interface StreamMessageParams {
  chatId: string
  allMessages: Array<Message>
}

interface StreamSummaryParams {
  chatId: string
  chatMessages: Array<CoreMessage>
}

class OpenRouter {
  private apiKey: string | undefined
  private chatSystemPrompt: string
  private summarySystemPrompt: string
  private provider: OpenRouterProvider

  constructor() {
    this.apiKey = process.env.OPEN_ROUTER_PROJECT_IDEA_CHAT_KEY
    this.chatSystemPrompt = chatSystemPrompt
    this.summarySystemPrompt = summarySystemPrompt
    this.provider = createOpenRouter({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: this.apiKey,
    })
  }

  streamMessage({ allMessages, chatId }: StreamMessageParams) {
    const message = streamText({
      model: this.provider.chat('anthropic/claude-3.5-haiku'),
      system: this.chatSystemPrompt,
      messages: allMessages,
      experimental_transform: smoothStream(),
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

  streamSummary({ chatMessages, chatId }: StreamSummaryParams) {
    const summary = streamObject({
      model: this.provider.chat('anthropic/claude-3.5-sonnet'),
      schema: summarySchema,
      system: this.summarySystemPrompt,
      messages: chatMessages,
      async onFinish({ object }) {
        if (!object) {
          throw Error('Object is not defined')
        }

        const projectName = object.appOverview.projectName
        const user = await initDatabaseConnection()
        await db.insert(projects).values({
          name: projectName,
          appIdeaSummaryJson: object,
          conversationId: chatId,
          userId: user.id,
        })
      },
    })

    return summary
  }
}

export const openRouter = new OpenRouter()
