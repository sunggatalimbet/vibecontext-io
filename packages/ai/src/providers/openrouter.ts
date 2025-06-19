import {
  createOpenRouter,
  type OpenRouterProvider,
} from '@openrouter/ai-sdk-provider'
import { createConversationMessage, createProjectSummary } from '@repo/db'
import {
  CoreMessage,
  Message,
  smoothStream,
  streamObject,
  streamText,
} from 'ai'
import { chatSystemPrompt, summarySystemPrompt } from '../prompts'
import { summarySchema, type AppIdeaSummary } from '../schemas/summary.schema'

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
        const message = response.messages[0]
        const content = (message.content[0] as { text: string }).text

        await createConversationMessage({
          chatId: chatId,
          role: 'assistant',
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

        const typedObject = object as AppIdeaSummary
        const name = typedObject.appOverview.projectName
        await createProjectSummary({
          conversationId: chatId,
          name: name,
          appIdeaSummaryJson: typedObject,
        })
      },
    })

    return summary
  }
}

export const openRouter = new OpenRouter()
