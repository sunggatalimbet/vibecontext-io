'use client'

import { use } from 'react'
import Link from 'next/link'
import { type Conversation } from '@repo/db'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useSidebar } from './sidebar-provider'

interface SidebarConversationsAccordionContentProps {
  conversationsPromise: Promise<Array<Conversation>>
}

export const SidebarConversationsAccordionContent = ({
  conversationsPromise,
}: SidebarConversationsAccordionContentProps) => {
  const { currentPath } = useSidebar()
  const conversations = use(conversationsPromise)

  return (
    <>
      {conversations.map(conversation => {
        const projectPath = `/conversations/${conversation.id}`
        const isActive = currentPath === projectPath

        return (
          <Button
            asChild
            variant="ghost"
            key={conversation.id}
            className={cn(
              'w-full justify-start gap-2 px-2 h-9',
              isActive
                ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary'
            )}
          >
            <Link href={projectPath} className="flex items-center w-full">
              <span className="text-sm ml-2">{conversation.title}</span>
            </Link>
          </Button>
        )
      })}
    </>
  )
}
