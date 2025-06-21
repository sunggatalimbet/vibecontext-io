import Link from 'next/link'
import { CheckCircleIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { useProject } from './project-provider'

export const ProjectComplete = () => {
  const { conversation } = useProject()

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

        <Link href={`/projects/generate?conversationId=${conversation.id}`}>
          <Button size="sm" className="mt-3">
            Generate Project Summary
          </Button>
        </Link>
      </section>
    </>
  )
}
