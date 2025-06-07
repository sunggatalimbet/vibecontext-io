import { PlusIcon, FolderIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createChat } from '@/lib/actions'

export default function ProjectsPage() {
  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-satoshi italic tracking-tight">
            Your Projects
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and explore your AI-assisted development projects
          </p>
        </div>
        <form action={createChat}>
          <Button>
            <PlusIcon className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </form>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <FolderIcon className="h-24 w-24 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start your first project to begin transforming your app ideas into
            structured development plans.
          </p>
        </div>
        <form action={createChat}>
          <Button size="lg">
            <PlusIcon className="h-5 w-5" />
            <span>Create Your First Project</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
