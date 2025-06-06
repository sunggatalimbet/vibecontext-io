import Link from 'next/link'
import { CheckCircleIcon, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CompleteProjectProps {
  isProjectCreated: boolean
  isGeneratingProject: boolean
  projectCreatedName: string
}

export const CompleteProject = ({
  isProjectCreated,
  isGeneratingProject,
  projectCreatedName,
}: CompleteProjectProps) => {
  return (
    <section className="p-4 mx-4 my-2 bg-muted/50 rounded-lg border">
      {!isProjectCreated ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Discovery Complete!</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Great work! I&apos;ve gathered all the information needed about your
            app idea. Now let&apos;s create your project and generate the
            documentation.
          </p>
          <Button
            size="sm"
            className="mt-3"
            onClick={() => {
              console.log('Generate')
            }}
            disabled={isGeneratingProject}
          >
            {isGeneratingProject ? (
              <>
                <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                Creating Project...
              </>
            ) : (
              'Generate Project Summary'
            )}
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Project Created Successfully!</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Your project &quot;{projectCreatedName}&quot; has been created with
            a complete summary. You can now view your project or continue with
            documentation generation.
          </p>
          <div className="flex gap-2">
            <Link href={`/projects/${projectCreatedName}`}>View Project</Link>
            <Button size="sm" variant="outline" disabled>
              Generate Documentation (Coming Soon)
            </Button>
          </div>
        </>
      )}
    </section>
  )
}
