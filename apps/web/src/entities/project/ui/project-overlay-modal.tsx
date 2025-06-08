/**
 * @file: project-overlay-modal.tsx
 * @description: Full-screen overlay modal for displaying project overview with ProjectSummaryCard
 * @dependencies: ProjectSummaryCard, shadcn/ui components, Lucide React icons
 * @created: 2025-01-07
 */

'use client'

import { useEffect } from 'react'
import { XIcon } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { useProject } from './project-provider'
import { ProjectSummaryCard } from './project-summary-card'

interface ProjectOverlayModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProjectOverlayModal({
  isOpen,
  onClose,
}: ProjectOverlayModalProps) {
  const { project, summary } = useProject()

  // Handle Escape key press and focus management
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      // Prevent body scroll when modal is open
      document.body.classList.add('overflow-hidden')

      // Focus the close button for accessibility
      const closeButton = document.querySelector(
        '[aria-label="Close project overview"]'
      ) as HTMLButtonElement
      if (closeButton) {
        closeButton.focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen, onClose])

  // Don't render if not open or on server
  if (!isOpen || typeof document === 'undefined') return null

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background backdrop-blur-sm transition-all duration-300 ease-in-out"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-overview-title"
    >
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-[12px] z-60 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg border-border"
        onClick={onClose}
        aria-label="Close project overview"
      >
        <XIcon className="h-5 w-5" />
      </Button>

      <div className="relative w-full h-full max-w-none">
        <ScrollArea className="h-full w-full">
          <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <h1 id="project-overview-title" className="sr-only">
                Project Overview
              </h1>

              <div className="transition-all duration-300 ease-in-out transform">
                <ProjectSummaryCard
                  summary={project?.appIdeaSummaryJson || summary}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )

  // Use createPortal to render the modal at the document body level
  return createPortal(modalContent, document.body)
}
