'use client'

import {
  type ChangeEvent,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useChat } from '@ai-sdk/react'
import type { UIMessage } from 'ai'

interface ProjectContextValue {
  messages: Array<UIMessage>
  input: string
  status: 'ready' | 'error' | 'submitted' | 'streaming'
  isProjectCompleted: boolean
  isProjectGenerating: boolean
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  userMessageCount: number
  remainingMessages: number
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined)

interface ProjectContainerProps {
  children: React.ReactNode
}

export const ProjectContainer = ({ children }: ProjectContainerProps) => {
  const { messages, input, status, handleInputChange, handleSubmit } = useChat({
    maxSteps: 1,
    api: '/api/chat',
  })

  const userMessageCount = messages.filter(m => m.role === 'user').length
  const maxQuestions = 10

  const [isProjectCompleted, setIsProjectCompleted] = useState(
    userMessageCount >= maxQuestions
  )

  const remainingMessages = Math.max(0, maxQuestions - userMessageCount)
  const isProjectGenerating = false

  const value: ProjectContextValue = {
    messages,
    input,
    status,
    isProjectCompleted,
    isProjectGenerating,
    handleInputChange,
    handleSubmit,
    userMessageCount,
    remainingMessages,
  }

  useEffect(() => {
    if (userMessageCount >= maxQuestions && !isProjectCompleted) {
      setIsProjectCompleted(true)
    }
  }, [userMessageCount, isProjectCompleted, setIsProjectCompleted])

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
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
