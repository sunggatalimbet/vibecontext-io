/**
 * @file: create-project-button.tsx
 * @description: Client-side create project button that navigates to conversation page
 * @dependencies: React useTransition, Next.js redirect, shadcn/ui components
 * @created: 2025-01-22
 */

'use client'

import { useTransition } from 'react'
import { redirect } from 'next/navigation'
import { PlusIcon } from 'lucide-react'
import { createUserConversationAction } from '@/lib/actions'
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
  const [isPending, startTransition] = useTransition()

  function handleCreateProject() {
    startTransition(async () => {
      const result = await createUserConversationAction()
      if (!result.success) {
        throw new Error(result.error.message ?? 'Unexpected error occurred')
      }
      redirect(`/conversations/${result.data.id}`)
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
