'use client'

import { useRouter } from 'next/navigation'
import { PlusIcon } from 'lucide-react'
import { Button, type ButtonProps } from './ui/button'

export const CreateProjectButton = ({ variant }: ButtonProps) => {
  const router = useRouter()

  function handleCreateProject() {
    const chatId = crypto.randomUUID()
    router.push(`/projects/${chatId}`)
  }

  return (
    <Button onClick={handleCreateProject} variant={variant}>
      <PlusIcon className="h-4 w-4" />
      <span className="text-sm ml-2">Start New Project</span>
    </Button>
  )
}
