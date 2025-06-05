'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LogOutIcon,
  MenuIcon,
  FolderIcon,
  FileIcon,
  CodeIcon,
  PlusIcon,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Document {
  id: string
  name: string
  status: 'generating' | 'completed'
  href: string
}

interface Project {
  id: string
  name: string
  href: string
  icon: React.ReactNode
}

const projects: Array<Project> = [
  {
    id: '1',
    name: 'AI Studio',
    href: '/projects/ai-studio',
    icon: <CodeIcon className="h-4 w-4" />,
  },
  {
    id: '2',
    name: 'Web3 Shop',
    href: '/projects/web3-shop',
    icon: <CodeIcon className="h-4 w-4" />,
  },
  {
    id: '3',
    name: 'Personal Blog',
    href: '/projects/personal-blog',
    icon: <CodeIcon className="h-4 w-4" />,
  },
]

const documents: Array<Document> = [
  {
    id: '1',
    name: 'Product Requirements',
    status: 'completed',
    href: '/docs/product-requirements',
  },
  {
    id: '2',
    name: 'Technical Requirements',
    status: 'completed',
    href: '/docs/technical-requirements',
  },
  {
    id: '3',
    name: 'Technology Stack',
    status: 'generating',
    href: '/docs/technology-stack',
  },
  {
    id: '4',
    name: 'Architecture Overview',
    status: 'generating',
    href: '/docs/architecture',
  },
  {
    id: '5',
    name: 'Development Timeline',
    status: 'completed',
    href: '/docs/timeline',
  },
]

const DocumentItem = ({ document }: { document: Document }) => {
  const pathname = usePathname()
  const isActive = pathname === document.href

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full justify-start gap-2 px-2 h-9',
        isActive
          ? 'bg-sidebar-accent text-sidebar-primary font-medium'
          : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary'
      )}
    >
      <Link href={document.href} className="flex items-center">
        <span
          className={cn(
            'h-2 w-2 rounded-full mr-2',
            document.status === 'generating' ? 'bg-yellow-500' : 'bg-green-500'
          )}
          aria-hidden="true"
        />
        <span className="text-sm">{document.name}</span>
      </Link>
    </Button>
  )
}

const ProjectItem = ({ project }: { project: Project }) => {
  const pathname = usePathname()
  const isActive = pathname === project.href

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full justify-start gap-2 px-2 h-9',
        isActive
          ? 'bg-sidebar-accent text-sidebar-primary font-medium'
          : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary'
      )}
    >
      <Link href={project.href} className="flex items-center w-full">
        {project.icon}
        <span className="text-sm ml-2">{project.name}</span>
      </Link>
    </Button>
  )
}

const StartNewProjectButton = () => {
  const pathname = usePathname()
  const isActive = pathname === '/projects/new'

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full justify-start gap-2 px-2 h-9 opacity-70 hover:opacity-100 transition-opacity',
        isActive
          ? 'bg-sidebar-accent text-sidebar-primary font-medium opacity-100'
          : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary'
      )}
    >
      <Link href="/projects/new" className="flex items-center w-full">
        <PlusIcon className="h-4 w-4" />
        <span className="text-sm ml-2">Start New Project</span>
      </Link>
    </Button>
  )
}

const DocumentSkeleton = () => (
  <div className="px-2 py-1">
    <div className="flex items-center gap-2 animate-pulse">
      <div className="h-2 w-2 rounded-full bg-muted" />
      <Skeleton className="h-4 w-[160px]" />
    </div>
  </div>
)

const SidebarContent = ({ className }: { className?: string }) => {
  const [isLoading] = useState(false)

  return (
    <div className={cn('flex h-full w-full flex-col', className)}>
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
          defaultValue={['projects', 'docs']}
          className="space-y-1"
        >
          <AccordionItem value="projects" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FolderIcon className="h-4 w-4" />
                Projects
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                <StartNewProjectButton />
                {projects.map(project => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="docs" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileIcon className="h-4 w-4" />
                Docs
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                {isLoading ? (
                  <>
                    <DocumentSkeleton />
                    <DocumentSkeleton />
                    <DocumentSkeleton />
                  </>
                ) : (
                  documents.map(doc => (
                    <DocumentItem key={doc.id} document={doc} />
                  ))
                )}
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

export function Sidebar() {
  return (
    <>
      <div className="hidden md:flex relative h-screen w-[240px] flex-col border-r border-border bg-background">
        <SidebarContent />
      </div>

      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="ml-2">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0 bg-background">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
