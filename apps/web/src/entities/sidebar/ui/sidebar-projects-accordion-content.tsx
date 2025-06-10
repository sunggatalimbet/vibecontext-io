'use client'

/**
 * @file: sidebar-accordion.tsx
 * @description: Client-side accordion component for sidebar navigation
 * @dependencies: shadcn/ui Accordion, Lucide React icons
 * @created: 2025-01-07
 */
import { use } from 'react'
import Link from 'next/link'
import { type Project } from '@repo/db'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useSidebar } from './sidebar-provider'

interface SidebarProjectsAccordionContentProps {
  projectsPromise: Promise<Array<Project>>
}

export const SidebarProjectsAccordionContent = ({
  projectsPromise,
}: SidebarProjectsAccordionContentProps) => {
  const { currentPath } = useSidebar()
  const projects = use(projectsPromise)

  return (
    <>
      {projects.map(project => {
        const isActive = currentPath === project.id

        return (
          <Button
            asChild
            variant="ghost"
            key={project.id}
            className={cn(
              'w-full justify-start gap-2 px-2 h-9',
              isActive
                ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary'
            )}
          >
            <Link href={project.id} className="flex items-center w-full">
              <span className="text-sm ml-2">{project.name}</span>
            </Link>
          </Button>
        )
      })}
    </>
  )
}

{
  /* <AccordionItem value="docs" className="border-none">
        <AccordionTrigger className="py-2 hover:no-underline">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileIcon className="h-4 w-4" />
            Docs
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1">
            {documents.map(doc => (
              <DocumentItem
                key={doc.id}
                document={doc}
                currentPath={currentPath}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem> */
}
