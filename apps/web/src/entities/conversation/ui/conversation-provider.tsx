'use client'

import { type ChangeEvent, createContext, useContext } from 'react'
import { useChat } from '@ai-sdk/react'
import type { ConversationOmitUserId, DataResponse, Message } from '@repo/db'
import { type UIMessage } from 'ai'
import { MAX_USER_MESSAGES } from '@/shared/lib/constants'

interface ConversationContextValue {
  conversation: ConversationOmitUserId
  messages: Array<UIMessage>
  input: string
  status: 'ready' | 'error' | 'submitted' | 'streaming'
  isConversationCompleted: boolean
  canGenerateProject: boolean
  userMessageCount: number
  remainingMessages: number
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const ConversationContext = createContext<ConversationContextValue | null>(null)

interface ConversationProviderProps {
  conversationData: DataResponse<ConversationOmitUserId>
  conversationMessagesData: DataResponse<Array<Message>>
  children: React.ReactNode
}

export const ConversationProvider = ({
  conversationData,
  conversationMessagesData,
  children,
}: ConversationProviderProps) => {
  if (!conversationData.success) {
    throw new Error(conversationData.error.message ?? 'Unknown error occurred')
  }

  const conversation = conversationData.data

  const { messages, input, status, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    id: conversation.id,
    maxSteps: 1,
    initialMessages: conversationMessagesData.success
      ? conversationMessagesData.data
      : [],
    sendExtraMessageFields: true,
    experimental_prepareRequestBody({ messages, id }) {
      return { message: messages[messages.length - 1], id }
    },
  })

  const userMessageCount = messages.filter(m => m.role === 'user').length
  const remainingMessages = Math.max(0, MAX_USER_MESSAGES - userMessageCount)
  const isConversationCompleted = userMessageCount >= MAX_USER_MESSAGES
  const canGenerateProject = userMessageCount >= 1 // Can generate after first message

  const value: ConversationContextValue = {
    conversation,
    messages,
    input,
    status,
    isConversationCompleted,
    canGenerateProject,
    handleInputChange,
    handleSubmit,
    userMessageCount,
    remainingMessages,
  }

  return (
    <ConversationContext.Provider value={value}>
      <div className="flex flex-col justify-between h-full w-full max-w-none mx-auto">
        {children}
      </div>
    </ConversationContext.Provider>
  )
}

export const useConversation = (): ConversationContextValue => {
  const context = useContext(ConversationContext)
  if (context === null) {
    throw new Error(
      'useConversation must be used within a ConversationProvider'
    )
  }
  return context
}
