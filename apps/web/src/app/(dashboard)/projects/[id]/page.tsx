import Link from 'next/link'
import { type DeepPartial } from 'ai'
import { ArrowLeftIcon } from 'lucide-react'
import type z from 'zod'
import { ProjectSummaryCard } from '@/entities/project/ui/project-summary-card'
import { getUserProjectDataById } from '@/lib/actions/project'
import { Button } from '@/shared/components/ui/button'
import { type summarySchema } from '../../../../lib/schemas'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const projectData = await getUserProjectDataById(id)

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
  const projectSummary = projectData.data.appIdeaSummaryJson as DeepPartial<
    z.infer<typeof summarySchema>
  >

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-satoshi italic tracking-tight">
              {project.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Project Overview & Documentation
            </p>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="flex-1">
        <ProjectSummaryCard summary={projectSummary} />
      </div>
    </div>
  )
}
