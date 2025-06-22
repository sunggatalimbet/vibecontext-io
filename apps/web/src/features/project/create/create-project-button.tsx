'use client'

import { useRouter } from 'next/navigation'
import { SparklesIcon } from 'lucide-react'
import { createUserProjectAction } from '@/lib/actions/project'
import { Button } from '@/shared/components/ui/button'

interface CreateProjectButtonProps {
  conversationId: string
}

export const CreateProjectButton = ({
  conversationId,
}: CreateProjectButtonProps) => {
  const router = useRouter()

  async function handleGenerateProject() {
    const createdProject = await createUserProjectAction(conversationId)

    if (!createdProject.success) {
      console.error(createdProject.error.message)
      return
    }

    router.push(`/projects/${createdProject.data.id}`)
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleGenerateProject}
      className="flex items-center gap-1.5 ml-2"
    >
      <SparklesIcon className="h-3 w-3" />
      <span className="text-xs">Generate Project</span>
    </Button>
  )
}
