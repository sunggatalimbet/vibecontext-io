import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getUserProjectByConversationId } from '@repo/db'
import { ArrowLeftIcon } from 'lucide-react'
import { ProjectSummaryGenerator } from '@/features/project/project-summary-generator'
import { Button } from '@/shared/components/ui/button'

interface GenerateProjectPageProps {
  searchParams: Promise<{ conversationId?: string }>
}

export default async function GenerateProjectPage({
  searchParams,
}: GenerateProjectPageProps) {
  const { conversationId } = await searchParams

  if (!conversationId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Invalid Request</h2>
          <p className="text-muted-foreground mb-4">
            No conversation ID provided.
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

  const project = await getUserProjectByConversationId(conversationId)

  if (project) {
    redirect(`/projects/${project.id}`)
  }

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/projects">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-satoshi italic tracking-tight">
            Generate New Project
          </h1>
          <p className="text-muted-foreground mt-1">
            Creating a comprehensive project overview from your conversation
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <ProjectSummaryGenerator conversationId={conversationId} />
      </div>
    </div>
  )
}
