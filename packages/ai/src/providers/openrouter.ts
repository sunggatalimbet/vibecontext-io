import {
  createOpenRouter,
  type OpenRouterProvider,
} from '@openrouter/ai-sdk-provider'
import { smoothStream, streamText } from 'ai'
import { chatSystemPrompt } from '../prompts'

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

  streamMessage(userPrompt: string) {
    const message = streamText({
      model: this.provider.chat('anthropic/claude-3.5-haiku'),
      prompt: userPrompt,
      system: this.systemPrompt,
      //   experimental_transform: smoothStream(),
      onError: ({ error }) => {
        console.error(error)
      },
    })

    return message
  }
}

export const openRouter = new OpenRouter()
