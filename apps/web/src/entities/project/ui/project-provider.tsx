'use client'

import {
  type ChangeEvent,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useChat, experimental_useObject as useObject } from '@ai-sdk/react'
import type {
  ConversationOmitUserId,
  DataResponse,
  Message,
  Project,
} from '@repo/db'
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
  project: Project | null
  isSummaryGenerating: boolean
  isOverlayOpen: boolean
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  generateSummary: (input: { chatId: string }) => void
  openOverlay: () => void
  closeOverlay: () => void
  userMessageCount: number
  remainingMessages: number
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

interface ProjectProviderProps {
  conversationData: DataResponse<ConversationOmitUserId>
  conversationMessagesData: DataResponse<Array<Message>>
  projectData: DataResponse<Project>
  children: React.ReactNode
}

export const ProjectProvider = ({
  conversationData,
  conversationMessagesData,
  projectData,
  children,
}: ProjectProviderProps) => {
  if (!conversationData.success) {
    throw new Error(conversationData.error.message ?? 'Unknown error occurred')
  }

  if (!conversationMessagesData.success) {
    throw new Error(
      conversationMessagesData.error.message ?? 'Unknown error occured'
    )
  }

  if (!projectData.success) {
    throw new Error(projectData.error.message ?? 'Unknown error occured')
  }

  const conversation = conversationData.data
  const conversationMessages = conversationMessagesData.data
  const project = projectData.data

  const { messages, input, status, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    id: conversation.id,
    maxSteps: 1,
    initialMessages: conversationMessages,
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

  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const remainingMessages = Math.max(0, MAX_USER_MESSAGES - userMessageCount)
  const isProjectCompleted = userMessageCount >= MAX_USER_MESSAGES
  const canGenerateProject = userMessageCount >= 1 // Can generate after first message

  const openOverlay = () => setIsOverlayOpen(true)
  const closeOverlay = () => setIsOverlayOpen(false)

  const value: ProjectContextValue = {
    conversation,
    summary: summary ?? {},
    messages,
    input,
    status,
    project,
    isProjectCompleted,
    canGenerateProject,
    isSummaryGenerating,
    isOverlayOpen,
    handleInputChange,
    handleSubmit,
    generateSummary,
    openOverlay,
    closeOverlay,
    userMessageCount,
    remainingMessages,
  }

  useEffect(() => {
    if (project) {
      openOverlay()
    }
  }, [project])

  return (
    <ProjectContext.Provider value={value}>
      <div className="flex flex-col justify-between max-h-[calc(100vh-60px)] h-full w-full max-w-none mx-auto">
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
