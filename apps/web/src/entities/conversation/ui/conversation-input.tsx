'use client'

import { ArrowUpIcon } from 'lucide-react'
import { ChatInput } from '@/components/chat'
import { CreateProjectButton } from '@/features/project/create'
import { Button } from '@/shared/components/ui/button'
import { useConversation } from './conversation-provider'

export const ConversationInput = () => {
  const {
    input,
    status,
    isConversationCompleted,
    conversation,
    canGenerateProject,
    userMessageCount,
    remainingMessages,
    handleInputChange,
    handleSubmit,
  } = useConversation()

  const chatInputPlaceholder =
    userMessageCount === 0
      ? 'Describe your app idea...'
      : remainingMessages > 1
        ? `Continue describing your idea... (${remainingMessages} questions remaining)`
        : "Final question - let's wrap up your idea!"

  if (isConversationCompleted) {
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

  const isInputDisabled = status !== 'ready' || isConversationCompleted
  const isSubmitDisabled = !input.trim() || isInputDisabled

  return (
    <div className="flex-shrink-0 border-t bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4">
        {/* Show generate project option after first message */}
        {canGenerateProject && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">
                  Ready to generate your project?
                </p>
                <p className="text-xs text-muted-foreground">
                  You can create your project now, or continue answering
                  questions for better results. More context leads to more
                  detailed and accurate project documentation.
                </p>
              </div>
              <CreateProjectButton conversationId={conversation.id} />
            </div>
          </div>
        )}

        <form
          className="flex items-center pl-2 pr-4 border rounded-lg shadow-lg bg-background"
          onSubmit={handleSubmit}
        >
          <ChatInput
            name="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder={chatInputPlaceholder}
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            disabled={isInputDisabled}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isSubmitDisabled}
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
