import Link from 'next/link'
import type { summarySchema } from '@repo/ai'
import type { DeepPartial } from 'ai'
import { ArrowLeftIcon } from 'lucide-react'
import type z from 'zod'
import { ViewProjectSummaryCard } from '@/features/project/view/view-project-summary-card'
import { getUserProjectByIdAction } from '@/lib/actions'
import { Button } from '@/shared/components/ui/button'

interface ProjectSummaryCardContainerProps {
  params: Promise<{ id: string }>
}

export const ViewProjectSummaryCardContainer = async ({
  params,
}: ProjectSummaryCardContainerProps) => {
  const { id } = await params
  const projectData = await getUserProjectByIdAction(id)

  if (!projectData.success) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-4">
            The project you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have access to it.
          </p>
          <Link href="/projects">
            <Button variant="outline">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const project = projectData.data
  const projectSummary = project?.appIdeaSummaryJson as DeepPartial<
    z.infer<typeof summarySchema>
  >

  return <ViewProjectSummaryCard summary={projectSummary} />
}
