'use client'

import { type ChangeEvent, createContext, useContext } from 'react'
import { useChat, experimental_useObject as useObject } from '@ai-sdk/react'
import type { ConversationOmitUserId, DataResponse, Message } from '@repo/db'
import { type DeepPartial, type UIMessage } from 'ai'
import { type z } from 'zod'
import { summarySchema } from '@/lib/schemas'
import { MAX_USER_MESSAGES } from '@/shared/lib/constants'

interface ProjectContextValue {
  conversation: ConversationOmitUserId
  summary: DeepPartial<z.infer<typeof summarySchema>>
  messages: Array<UIMessage>
  input: string
  status: 'ready' | 'error' | 'submitted' | 'streaming'
  isProjectCompleted: boolean
  canGenerateProject: boolean
  isSummaryGenerating: boolean
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  generateSummary: (input: { chatId: string }) => void
  userMessageCount: number
  remainingMessages: number
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

interface ProjectProviderProps {
  conversationData: DataResponse<ConversationOmitUserId>
  conversationMessagesData: DataResponse<Array<Message>>
  children: React.ReactNode
}

export const ProjectProvider = ({
  conversationData,
  conversationMessagesData,
  children,
}: ProjectProviderProps) => {
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

  // useObject hook for summary generation
  const {
    object: summary,
    submit: generateSummary,
    isLoading: isSummaryGenerating,
  } = useObject({
    api: '/api/summary',
    schema: summarySchema,
  })

  const userMessageCount = messages.filter(m => m.role === 'user').length
  const remainingMessages = Math.max(0, MAX_USER_MESSAGES - userMessageCount)
  const isProjectCompleted = userMessageCount >= MAX_USER_MESSAGES
  const canGenerateProject = userMessageCount >= 1 // Can generate after first message

  const value: ProjectContextValue = {
    conversation,
    summary: summary ?? {},
    messages,
    input,
    status,
    isProjectCompleted,
    canGenerateProject,
    isSummaryGenerating,
    handleInputChange,
    handleSubmit,
    generateSummary,
    userMessageCount,
    remainingMessages,
  }

  return (
    <ProjectContext.Provider value={value}>
      <div className="flex flex-col justify-between h-full w-full max-w-none mx-auto">
        {children}
      </div>
    </ProjectContext.Provider>
  )
}

export const useProject = (): ProjectContextValue => {
  const context = useContext(ProjectContext)
  if (context === null) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
