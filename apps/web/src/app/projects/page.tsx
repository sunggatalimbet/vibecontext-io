import { getUserProjectsWithDocs } from '@repo/db'
import { FolderIcon } from 'lucide-react'
import { ProjectCard } from '@/features/project'
import { CreateProjectButton } from '@/features/project/create'

export default async function ProjectsPage() {
  const projects = await getUserProjectsWithDocs()
  const hasProjects = projects && projects.length > 0

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
        <CreateProjectButton />
      </div>

      {hasProjects ? (
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <FolderIcon className="h-24 w-24 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Start your first project to begin transforming your app ideas into
              structured development plans.
            </p>
          </div>
          <CreateProjectButton />
        </div>
      )}
    </div>
  )
}
