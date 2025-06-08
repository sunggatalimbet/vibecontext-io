'use client'

import { ArrowUpIcon } from 'lucide-react'
import { ChatInput } from '@/components/chat'
import { Button } from '@/shared/components/ui/button'
import { useProject } from './project-provider'

export const ProjectInput = () => {
  const {
    input,
    status,
    isProjectCompleted,
    userMessageCount,
    remainingMessages,
    handleInputChange,
    handleSubmit,
  } = useProject()

  // TODO
  const chatInputPlaceholder =
    userMessageCount === 0
      ? 'Describe your app idea...'
      : remainingMessages > 1
        ? `Continue describing your idea... (${remainingMessages} questions remaining)`
        : "Final question - let's wrap up your idea!"

  if (isProjectCompleted) {
    return (
      <div className="flex-shrink-0 border-t bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Discovery phase complete! Ready to create your project.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-shrink-0 border-t bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4">
        <form
          className="flex items-center pl-2 pr-4 border rounded-lg shadow-lg bg-background"
          onSubmit={handleSubmit}
        >
          <ChatInput
            name="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder={chatInputPlaceholder}
            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 resize-none min-h-[auto]"
            disabled={status !== 'ready' || isProjectCompleted}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || status !== 'ready' || isProjectCompleted}
            className="rounded-md flex-shrink-0 w-10 h-10"
          >
            <ArrowUpIcon className="w-5 h-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
