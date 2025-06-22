'use client'

import { CheckCircleIcon, MessageCircleIcon, InfoIcon } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { Progress } from '@/shared/components/ui/progress'
import { MAX_USER_MESSAGES } from '@/shared/lib/constants'
import { useConversation } from './conversation-provider'

export const ConversationProgress = () => {
  const { isConversationCompleted, canGenerateProject, userMessageCount } =
    useConversation()

  const clampedCount = Math.min(userMessageCount, MAX_USER_MESSAGES)
  const remainingMessages = MAX_USER_MESSAGES - userMessageCount
  const progressPercentage = (clampedCount / MAX_USER_MESSAGES) * 100

  return (
    <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageCircleIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Project Discovery</span>
            {isConversationCompleted && (
              <Badge variant="secondary" className="ml-2">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            )}
            {canGenerateProject && !isConversationCompleted && (
              <Badge variant="outline" className="ml-2 text-xs">
                <InfoIcon className="h-3 w-3 mr-1" />
                Ready to generate
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {userMessageCount}/{MAX_USER_MESSAGES} questions
            </span>
            {!isConversationCompleted && (
              <Badge variant="outline" className="text-xs">
                {remainingMessages} optional
              </Badge>
            )}
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        {canGenerateProject && !isConversationCompleted && (
          <p className="text-xs text-muted-foreground mt-2">
            💡 You can generate your project anytime. More questions provide
            richer context for better results.
          </p>
        )}
      </div>
    </div>
  )
}
