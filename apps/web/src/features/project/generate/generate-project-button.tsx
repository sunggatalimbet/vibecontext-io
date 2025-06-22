'use client'

import { useRouter } from 'next/navigation'
import { createUserProject } from '@repo/db'
import { SparklesIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

interface GenerateProjectButtonProps {
  conversationId: string
}

export const GenerateProjectButton = ({
  conversationId,
}: GenerateProjectButtonProps) => {
  const router = useRouter()

  async function handleGenerateProject() {
    const createdProject = await createUserProject({ conversationId })
    router.push(`/projects/${createdProject.id}`)
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
