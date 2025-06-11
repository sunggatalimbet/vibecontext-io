/**
 * @file: project-card.tsx
 * @description: Reusable card component for displaying project information with document metadata
 * @dependencies: shadcn/ui Card components, date-fns, Lucide React icons
 * @created: 2025-01-11
 */

'use client'

import Link from 'next/link'
import type { ProjectWithDocs } from '@repo/db'
import { formatDistanceToNow } from 'date-fns'
import {
  FileTextIcon,
  SettingsIcon,
  ClipboardListIcon,
  TestTubeIcon,
  MousePointerIcon,
  CalendarIcon,
} from 'lucide-react'
import type { IAppIdeaSummary } from '@/lib/types/idea'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

interface ProjectCardProps {
  project: ProjectWithDocs
}

const DOC_TYPE_CONFIG = {
  techRequirementsFilename: {
    icon: SettingsIcon,
    label: 'Tech Requirements',
    shortLabel: 'Tech',
  },
  prodRequirementsFilename: {
    icon: ClipboardListIcon,
    label: 'Product Requirements',
    shortLabel: 'Product',
  },
  techStackFilename: {
    icon: SettingsIcon,
    label: 'Tech Stack',
    shortLabel: 'Stack',
  },
  prdFilename: {
    icon: FileTextIcon,
    label: 'PRD',
    shortLabel: 'PRD',
  },
  qaFilename: {
    icon: TestTubeIcon,
    label: 'QA',
    shortLabel: 'QA',
  },
  cursorRulesFilename: {
    icon: MousePointerIcon,
    label: 'Cursor Rules',
    shortLabel: 'Rules',
  },
} as const

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const ideaSummary = project.appIdeaSummaryJson as IAppIdeaSummary
  const availableDocs = project.docs
    ? Object.entries(project.docs).filter(([, filename]) => filename)
    : []

  const summary = ideaSummary.appOverview.purpose

  const formattedDate = formatDistanceToNow(new Date(project.createdAt), {
    addSuffix: true,
  })

  return (
    <Link
      href={`/projects/${project.id}`}
      className="block"
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <Card className="h-full hover:shadow-md transition-all duration-200 border-border/40 bg-card">
        <CardHeader className="pb-3 space-y-2">
          <CardTitle className="text-base font-semibold line-clamp-1">
            {project.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3" />
            {formattedDate}
          </CardDescription>
          {summary && (
            <CardDescription className="line-clamp-2 text-sm leading-relaxed">
              {summary}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="pt-0 pb-4">
          {availableDocs.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {availableDocs.map(([docType]) => {
                const config =
                  DOC_TYPE_CONFIG[docType as keyof typeof DOC_TYPE_CONFIG]
                if (!config) return null

                const Icon = config.icon
                return (
                  <Link
                    key={docType}
                    href="/"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-2 p-2 bg-muted/30 hover:bg-muted/50 rounded-md text-xs transition-colors group"
                  >
                    <Icon className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                    <span className="truncate font-medium group-hover:text-foreground transition-colors">
                      {config.shortLabel}
                    </span>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                className="text-xs"
              >
                Generate docs
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
