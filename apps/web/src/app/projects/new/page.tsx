'use client'

import { useState, type SyntheticEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUp, MessageCircle, CheckCircle, Loader2 } from 'lucide-react'
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@/components/chat/chat-bubble'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessageList } from '@/components/chat/chat-message-list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { IAppIdeaSummary } from '@/lib/types/idea'

const MAX_MESSAGES = 10

// Type definition for the expected JSON summary structure

export default function NewProjectPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<
    Array<{ id: number; content: string; sender: 'user' | 'ai' }>
  >([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isGeneratingProject, setIsGeneratingProject] = useState(false)
  const [projectCreated, setProjectCreated] = useState<{
    id: string
    name: string
  } | null>(null)

  // Calculate user message count (only count user messages for the limit)
  const userMessageCount = messages.filter(msg => msg.sender === 'user').length
  const remainingMessages = MAX_MESSAGES - userMessageCount
  const progressPercentage = (userMessageCount / MAX_MESSAGES) * 100

  // Check if conversation is complete
  useEffect(() => {
    if (userMessageCount >= MAX_MESSAGES && !isComplete) {
      setIsComplete(true)
    }
  }, [userMessageCount, isComplete])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || isComplete) return

    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      content: input.trim(),
      sender: 'user' as const,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call the idea generation API
      const response = await fetch('/api/chat/generate-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      })

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string }
        throw new Error(errorData.error || 'Failed to get AI response')
      }

      const data = (await response.json()) as { response: string }

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        content: data.response,
        sender: 'ai' as const,
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai' as const,
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateProjectSummary = async () => {
    setIsGeneratingProject(true)

    try {
      // Step 1: Generate AI summary from conversation history using the same LLM service
      const summaryResponse = await fetch('/api/chat/summarize-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!summaryResponse.ok) {
        const errorData = (await summaryResponse.json()) as { error?: string }
        throw new Error(errorData.error || 'Failed to generate summary')
      }

      const summaryData = (await summaryResponse.json()) as { summary: string }

      // Parse the JSON summary
      let appIdeaSummary: IAppIdeaSummary
      try {
        // The AI should return a JSON string, so we need to parse it
        appIdeaSummary = JSON.parse(summaryData.summary) as IAppIdeaSummary
      } catch (parseError) {
        console.error('Failed to parse AI summary:', parseError)
        throw new Error(
          'Failed to parse the generated summary. Please try again.'
        )
      }

      // Step 2: Create project with the summary
      const projectResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appIdeaSummary }),
      })

      if (!projectResponse.ok) {
        const errorData = (await projectResponse.json()) as { error?: string }
        throw new Error(errorData.error || 'Failed to create project')
      }

      const projectData = (await projectResponse.json()) as {
        success: true
        project: { id: string; name: string; createdAt: string }
      }

      // Set project created state
      setProjectCreated({
        id: projectData.project.id,
        name: projectData.project.name,
      })

      // Clear chat memory after successful project creation
      await fetch('/api/chat/generate-idea', {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error generating project:', error)

      // Add error message to chat
      const errorMessage = {
        id: Date.now(),
        content: `Error creating project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sender: 'ai' as const,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsGeneratingProject(false)
    }
  }

  const handleViewProject = () => {
    if (projectCreated) {
      router.push(`/projects/${projectCreated.id}`)
    }
  }

  return (
    <div className="flex flex-col justify-between h-full w-full max-w-none mx-auto">
      {/* Progress Header - Show when conversation started */}
      {messages.length > 0 && (
        <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Project Discovery</span>
                {isComplete && (
                  <Badge variant="secondary" className="ml-2">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {userMessageCount}/{MAX_MESSAGES} questions
                </span>
                {!isComplete && (
                  <Badge variant="outline" className="text-xs">
                    {remainingMessages} remaining
                  </Badge>
                )}
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      )}

      {/* Welcome Section - Hidden when messages exist */}
      <div
        className={`flex-shrink-0 text-center transition-all duration-500 ease-in-out ${
          messages.length > 0
            ? 'opacity-0 -translate-y-4 h-0 overflow-hidden'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <h1 className="text-4xl font-bold font-satoshi italic tracking-tight mb-4">
          Let&apos;s create your new project
        </h1>
        <p className="text-lg text-muted-foreground font-satoshi italic">
          Share your app idea and I&apos;ll help you develop it into a
          structured project
        </p>
        <div className="mt-6 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>10 focused questions to capture your vision</span>
          </div>
        </div>
      </div>

      {/* Chat Messages Area - Scrollable */}
      <ScrollArea className="flex-1 overflow-hidden max-h-[72vh]">
        <ChatMessageList smooth>
          {messages.map(message => (
            <ChatBubble
              key={message.id}
              variant={message.sender === 'user' ? 'sent' : 'received'}
            >
              {message.sender === 'ai' && (
                <ChatBubbleAvatar className="shrink-0" fallback="AI" />
              )}
              <ChatBubbleMessage
                variant={message.sender === 'user' ? 'sent' : 'received'}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {/* Completion Indicator */}
          {isComplete && (
            <div className="p-4 mx-4 my-2 bg-muted/50 rounded-lg border">
              {!projectCreated ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">Discovery Complete!</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great work! I&apos;ve gathered all the information needed
                    about your app idea. Now let&apos;s create your project and
                    generate the documentation.
                  </p>
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={handleGenerateProjectSummary}
                    disabled={isGeneratingProject}
                  >
                    {isGeneratingProject ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating Project...
                      </>
                    ) : (
                      'Generate Project Summary'
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">
                      Project Created Successfully!
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your project &quot;{projectCreated.name}&quot; has been
                    created with a complete summary. You can now view your
                    project or continue with documentation generation.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleViewProject}>
                      View Project
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      Generate Documentation (Coming Soon)
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {(isLoading || isGeneratingProject) && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar className="shrink-0" fallback="AI" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {/* Fixed Input Area */}
      <div className="flex-shrink-0 border-t bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4">
          {isComplete ? (
            <div className="text-center p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Discovery phase complete! Ready to create your project.
              </p>
            </div>
          ) : (
            <div className="flex items-center pl-2 pr-4 border rounded-lg shadow-lg bg-background">
              <ChatInput
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void handleSubmit(e)
                  }
                }}
                placeholder={
                  userMessageCount === 0
                    ? 'Describe your app idea...'
                    : remainingMessages > 1
                      ? `Continue describing your idea... (${remainingMessages} questions remaining)`
                      : "Final question - let's wrap up your idea!"
                }
                className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 resize-none min-h-[auto]"
                disabled={isLoading || isComplete}
              />
              <Button
                type="submit"
                size="icon"
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading || isComplete}
                className="rounded-md flex-shrink-0 w-10 h-10"
              >
                <ArrowUp className="w-5 h-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
