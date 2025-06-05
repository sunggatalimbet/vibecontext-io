'use client'

import Link from 'next/link'
import { PlusIcon, FolderIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
        <Button asChild>
          <Link href="/projects/new" className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            New Project
          </Link>
        </Button>
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
        <Button asChild size="lg">
          <Link href="/projects/new" className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Create Your First Project
          </Link>
        </Button>
      </div>
    </div>
  )
}
