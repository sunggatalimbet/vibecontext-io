/**
 * @file: document-item.tsx
 * @description: Server-side compatible document item component for sidebar
 * @dependencies: Next.js Link, shadcn/ui Button
 * @created: 2025-01-07
 */

import Link from 'next/link'
import { type Doc } from '@repo/db'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

interface SidebarDocumentItemProps {
  document: Doc
  currentPath?: string
}

export const SidebarDocumentItem = ({
  document,
  currentPath,
}: SidebarDocumentItemProps) => {
  const isActive = currentPath === document.id

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
      <Link href={document.id} className="flex items-center">
        <span
          className={cn(
            'h-2 w-2 rounded-full mr-2',
            document.id === 'generating' ? 'bg-yellow-500' : 'bg-green-500'
          )}
          aria-hidden="true"
        />
        <span className="text-sm">{document.prdFilename}</span>
      </Link>
    </Button>
  )
}
