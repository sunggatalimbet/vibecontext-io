'use client'

import {
  type ChangeEvent,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useChat, experimental_useObject as useObject } from '@ai-sdk/react'
import type { Conversation, Message, Project } from '@repo/db'
import { type DeepPartial, type UIMessage } from 'ai'
import { type z } from 'zod'
import { summarySchema } from '@/lib/schemas'

interface ProjectContextValue {
  chat: Conversation
  summary: DeepPartial<z.infer<typeof summarySchema>>
  messages: Array<UIMessage>
  input: string
  status: 'ready' | 'error' | 'submitted' | 'streaming'
  isProjectCompleted: boolean
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
  chat: Conversation
  chatMessages: Array<Message>
  project: Project | null
  children: React.ReactNode
}

export const ProjectProvider = ({
  chat,
  chatMessages,
  project,
  children,
}: ProjectProviderProps) => {
  const { messages, input, status, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    id: chat.id,
    maxSteps: 1,
    initialMessages: chatMessages,
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
  const maxQuestions = 10

  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const remainingMessages = Math.max(0, maxQuestions - userMessageCount)
  const isProjectCompleted = userMessageCount >= maxQuestions

  const openOverlay = () => setIsOverlayOpen(true)
  const closeOverlay = () => setIsOverlayOpen(false)

  const value: ProjectContextValue = {
    chat,
    summary: summary ?? {},
    messages,
    input,
    status,
    project,
    isProjectCompleted,
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
