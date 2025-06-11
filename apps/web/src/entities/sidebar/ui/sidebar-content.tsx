/**
 * @file: sidebar-content.tsx
 * @description: Server-side sidebar content component with navigation items
 * @dependencies: Next.js Link, shadcn/ui components
 * @created: 2025-01-07
 */

import { Suspense } from 'react'
import Link from 'next/link'
import { getUserConversations, getUserProjects } from '@repo/db'
import { FolderIcon, LogOutIcon, MessageCircleIcon } from 'lucide-react'
import { SidebarProjectsAccordionContent } from '@/entities/sidebar/ui/sidebar-projects-accordion-content'
import { CreateProjectButton } from '@/features/project/create'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'
import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { SidebarConversationsAccordionContent } from './sidebar-conversations-accordion-content'
import { SidebarProjectsSkeleton } from './sidebar-projects-skeleton'

export const SidebarContent = () => {
  const projectsPromise = getUserProjects()
  const conversationsPromise = getUserConversations()

  return (
    <div className={'flex h-full w-full flex-col'}>
      <div className="flex h-[60px] items-center px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-sidebar-primary transition-opacity hover:opacity-80"
        >
          <span className="font-bold italic font-satoshi">vibecontext.io</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3">
        <Accordion
          type="multiple"
          defaultValue={['conversations', 'projects']}
          className="space-y-1"
        >
          <AccordionItem value="conversations" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MessageCircleIcon className="h-4 w-4" />
                <span>Conversations</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                <CreateProjectButton isSidebar />
                <Suspense fallback={<SidebarProjectsSkeleton />}>
                  <SidebarConversationsAccordionContent
                    conversationsPromise={conversationsPromise}
                  />
                </Suspense>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="projects" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FolderIcon className="h-4 w-4" />
                  <span>Projects</span>
                </div>
                <Link
                  href="/projects"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors mr-2"
                >
                  View all
                </Link>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                <CreateProjectButton isSidebar />
                <Suspense fallback={<SidebarProjectsSkeleton />}>
                  <SidebarProjectsAccordionContent
                    projectsPromise={projectsPromise}
                  />
                </Suspense>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      <div className="border-t border-border p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 px-2 text-muted-foreground hover:text-destructive"
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  )
}
