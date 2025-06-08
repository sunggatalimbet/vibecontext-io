'use client'

import { useRouter } from 'next/navigation'
import { PlusIcon } from 'lucide-react'
import { Button } from './ui/button'

export const CreateProjectButton = () => {
  const router = useRouter()

  function handleCreateProject() {
    const chatId = crypto.randomUUID()
    router.push(`/projects/${chatId}`)
  }

  return (
    <Button
      onClick={handleCreateProject}
      variant="ghost"
      type="submit"
      className="w-full justify-start gap-2 px-2 h-9 opacity-70 hover:opacity-100 transition-opacity text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
    >
      <PlusIcon className="h-4 w-4" />
      <span className="text-sm ml-2">Start New Project</span>
    </Button>
  )
}
