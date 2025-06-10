/**
 * @file: sidebar-mobile-sheet.tsx
 * @description: Server-side mobile sheet component for sidebar navigation
 * @dependencies: shadcn/ui Sheet, Lucide React icons
 * @created: 2025-01-07
 */

import { Suspense } from 'react'
import Link from 'next/link'
import { getUserProjects } from '@repo/db'
import { LogOutIcon, MenuIcon } from 'lucide-react'
import { SidebarProjectsAccordionContent } from '@/entities/sidebar/ui/sidebar-projects-accordion-content'
import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/shared/components/ui/sheet'
import { SidebarProjectsSkeleton } from './sidebar-projects-skeleton'

export const SidebarMobileSheet = () => {
  const projectPromise = getUserProjects()

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="ml-2 mt-2">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] p-0 bg-background">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div className="flex h-full w-full flex-col">
          <div className="flex h-[60px] items-center px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-sidebar-primary transition-opacity hover:opacity-80"
            >
              <span className="font-bold italic font-satoshi">
                vibecontext.io
              </span>
            </Link>
          </div>

          <ScrollArea className="flex-1 px-3">
            <Suspense fallback={<SidebarProjectsSkeleton />}>
              <SidebarProjectsAccordionContent
                projectsPromise={projectPromise}
              />
            </Suspense>
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
      </SheetContent>
    </Sheet>
  )
}
