import { CheckCircleIcon, Loader2Icon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { useProject } from './project-provider'

export const ProjectComplete = () => {
  const {
    conversation,
    isSummaryGenerating,
    project,
    generateSummary,
    openOverlay,
  } = useProject()

  const handleGenerateProject = () => {
    if (project) {
      openOverlay()
    } else {
      generateSummary({ conversationId: conversation.id })
      setTimeout(() => openOverlay(), 2000)
    }
  }

  const getButtonContent = () => {
    if (isSummaryGenerating) {
      return (
        <div>
          <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
          <span>Creating Project...</span>
        </div>
      )
    }

    return project ? (
      <p>View Project Overview</p>
    ) : (
      <p>Generate Project Summary</p>
    )
  }

  return (
    <>
      <section className="p-4 mx-4 my-2 bg-muted/50 rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold">Discovery Complete!</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Great work! I&apos;ve gathered all the information needed about your
          app idea. Now let&apos;s create your project and generate the
          documentation.
        </p>

        <Button size="sm" className="mt-3" onClick={handleGenerateProject}>
          {getButtonContent()}
        </Button>
      </section>
    </>
  )
}
