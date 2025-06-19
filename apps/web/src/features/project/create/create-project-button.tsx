'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon } from 'lucide-react'
import { AsyncButtonContent } from '@/shared/components/async-button-content'
import { Button, type ButtonProps } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

interface CreateProjectButtonProps extends ButtonProps {
  isSidebar?: boolean
}

export const CreateProjectButton = ({
  variant = 'outline',
  className,
  isSidebar = false,
  ...props
}: CreateProjectButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleCreateProject() {
    startTransition(() => {
      const chatId = crypto.randomUUID()
      router.push(`/projects/${chatId}`)
    })
  }

  const buttonClassName = cn(
    'cursor-pointer',
    isSidebar &&
      'w-full justify-start gap-2 px-2 h-9 text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary',
    className
  )

  return (
    <Button
      onClick={handleCreateProject}
      variant={isSidebar ? 'ghost' : variant}
      disabled={isPending}
      className={buttonClassName}
      {...props}
    >
      <AsyncButtonContent isLoading={isPending} loadingText="Creating...">
        <PlusIcon className="h-4 w-4" />
        <span className="ml-2">Start New Project</span>
      </AsyncButtonContent>
    </Button>
  )
}
