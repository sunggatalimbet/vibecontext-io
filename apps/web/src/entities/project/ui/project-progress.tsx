'use client'

import { Suspense, lazy } from 'react'
import { CheckCircleIcon, MessageCircleIcon, ExpandIcon } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Progress } from '@/shared/components/ui/progress'
import { MAX_USER_MESSAGES } from '@/shared/lib/constants'
import { useProject } from './project-provider'

const ProjectOverlayModal = lazy(() => import('./project-overlay-modal'))

export const ProjectProgress = () => {
  const {
    isProjectCompleted,
    isOverlayOpen,
    project,
    summary,
    userMessageCount,
    openOverlay,
    closeOverlay,
  } = useProject()

  const clampedCount = Math.min(userMessageCount, MAX_USER_MESSAGES)
  const remainingMessages = MAX_USER_MESSAGES - userMessageCount
  const progressPercentage = (clampedCount / MAX_USER_MESSAGES) * 100

  // Show Full View button if we have project data or summary
  const hasProjectData = project || (summary && Object.keys(summary).length > 0)

  return (
    <>
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
              {hasProjectData && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openOverlay}
                  className="flex items-center gap-1.5 ml-2"
                >
                  <ExpandIcon className="h-3 w-3" />
                  <span className="text-xs">Full View</span>
                </Button>
              )}
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Project Overlay Modal */}
      {isOverlayOpen && (
        <Suspense fallback={null}>
          <ProjectOverlayModal isOpen={isOverlayOpen} onClose={closeOverlay} />
        </Suspense>
      )}
    </>
  )
}
