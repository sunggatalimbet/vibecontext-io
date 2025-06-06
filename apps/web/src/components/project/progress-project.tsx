'use client'

import { CheckCircleIcon, MessageCircleIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useProject } from './project-container'

const MAX_USER_MESSAGES = 10

export const ProgressProject = () => {
  const { userMessageCount, isProjectCompleted } = useProject()
  const remainingMessages = MAX_USER_MESSAGES - userMessageCount
  const progressPercentage = (userMessageCount / MAX_USER_MESSAGES) * 100

  return (
    <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageCircleIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Project Discovery</span>
            {isProjectCompleted && (
              <Badge variant="secondary" className="ml-2">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {userMessageCount}/{MAX_USER_MESSAGES} questions
            </span>
            {!isProjectCompleted && (
              <Badge variant="outline" className="text-xs">
                {remainingMessages} remaining
              </Badge>
            )}
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  )
}
