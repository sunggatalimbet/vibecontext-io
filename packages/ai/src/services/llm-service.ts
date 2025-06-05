import { BaseMessage } from '@langchain/core/messages'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import { ChatOpenAI } from '@langchain/openai'
import { ConversationChain } from 'langchain/chains'
import { BufferMemory } from 'langchain/memory'
import { chatBotPrompt, chatBotSummaryPrompt } from '../prompts/chatbot-prompts'

/**
 * Service for handling LLM interactions via OpenRouter with Claude 3.5 Haiku
 * Uses LangChain.js for conversation management and memory
 */
export class LLMService {
  private llm: ChatOpenAI
  private memory: BufferMemory
  private chain: ConversationChain
  private summaryTemplate: ChatPromptTemplate

  constructor() {
    // Check for required environment variable
    const openRouterKey = process.env.OPEN_ROUTER_PROJECT_IDEA_CHAT_KEY
    if (!openRouterKey) {
      throw new Error(
        'OPEN_ROUTER_PROJECT_IDEA_CHAT_KEY environment variable is required'
      )
    }

    // Initialize ChatOpenAI with OpenRouter configuration for Claude 3.5 Haiku
    this.llm = new ChatOpenAI({
      model: 'anthropic/claude-3.5-haiku',
      temperature: 0.7,
      apiKey: openRouterKey,
      configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
      },
    })

    // Initialize BufferMemory with 10 message limit
    this.memory = new BufferMemory({
      returnMessages: true,
      memoryKey: 'history',
    })

    // Create conversation chain with custom prompt template
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', chatBotPrompt],
      new MessagesPlaceholder('history'),
      ['human', '{input}'],
    ])

    this.chain = new ConversationChain({
      llm: this.llm,
      memory: this.memory,
      prompt,
    })

    // Initialize summary template
    this.summaryTemplate = ChatPromptTemplate.fromTemplate(chatBotSummaryPrompt)
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await this.chain.invoke({
        input: message,
      })

      return response.response as string
    } catch (error) {
      console.error('Error in LLM service:', error)
      throw new Error('Failed to get AI response. Please try again.')
    }
  }

  async getConversationHistory(): Promise<BaseMessage[]> {
    const messages = await this.memory.chatHistory.getMessages()
    return messages
  }

  async clearMemory(): Promise<void> {
    await this.memory.clear()
  }

  async generateAppIdeaSummary(): Promise<string> {
    try {
      const history = await this.getConversationHistory()

      if (history.length === 0) {
        throw new Error('No conversation history to summarize')
      }

      // Format conversation history
      const conversationText = history
        .map((msg: BaseMessage) => {
          const messageType = msg._getType()
          const messageContent =
            typeof msg.content === 'string'
              ? msg.content
              : JSON.stringify(msg.content)
          return `${messageType}: ${messageContent}`
        })
        .join('\n')

      // Use the ChatPromptTemplate for better structure
      const formattedPrompt = await this.summaryTemplate.formatMessages({
        conversation_history: conversationText,
      })

      const summaryResponse = await this.llm.invoke(formattedPrompt)
      console.log({ formattedPrompt, summaryResponse })

      return summaryResponse.content as string
    } catch (error) {
      console.error('Error generating app idea summary:', error)
      throw new Error('Failed to generate app idea summary')
    }
  }
}

// Singleton instance for the project idea chat
let llmServiceInstance: LLMService | null = null

export function getLLMService(): LLMService {
  if (!llmServiceInstance) {
    llmServiceInstance = new LLMService()
  }
  return llmServiceInstance
}
