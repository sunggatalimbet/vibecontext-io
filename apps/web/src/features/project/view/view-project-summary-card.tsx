/**
 * @file: view-project-summary-card.tsx
 * @description: Bento Grid Project Summary Card component for displaying comprehensive project analysis
 * @dependencies: summarySchema types, Lucide React icons, skeleton components
 * @created: 2025-01-07
 */

'use client'

import { useEffect, useRef } from 'react'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { getErrorDetails, type Project } from '@repo/db'
import { type DeepPartial } from 'ai'
import { type z } from 'zod'
import {
  ProjectSummaryHeader,
  ProjectSummaryNoData,
  ProjectSummaryCoreValue,
  ProjectSummaryTechApproach,
  ProjectSummaryFeatureCards,
  ProjectSummaryMvpScope,
  ProjectSummarySuccessMetrics,
  ProjectSummaryVision,
  ProjectSummaryDetails,
  ProjectSummaryFooter,
  ProjectSummaryConstraints,
} from '@/entities/project/ui/summary'
import { summarySchema } from '@/lib/schemas'

interface ViewProjectSummaryCardProps {
  project: Project | undefined
}

export const ViewProjectSummaryCard = ({
  project,
}: ViewProjectSummaryCardProps) => {
  const existingSummary = project?.appIdeaSummaryJson as DeepPartial<
    z.infer<typeof summarySchema>
  >

  const hasRequestedSummary = useRef(false)

  const {
    object: summary,
    submit: generateSummary,
    isLoading: isSummaryGenerating,
  } = useObject({
    api: '/api/summary',
    schema: summarySchema,
    initialValue: existingSummary,
  })

  // Auto-generate summary if it doesn't exist
  useEffect(() => {
    try {
      if (
        !existingSummary &&
        project?.conversationId &&
        !isSummaryGenerating &&
        !hasRequestedSummary.current
      ) {
        hasRequestedSummary.current = true
        generateSummary({
          conversationId: project.conversationId,
          projectId: project.id,
        })
      }
    } catch (err) {
      const errorDetails = getErrorDetails(err)
      console.error('createUserConversationAction error:', errorDetails)
    }
  }, [
    existingSummary,
    project?.conversationId,
    project?.id,
    isSummaryGenerating,
    generateSummary,
  ])

  const displaySummary = summary || existingSummary

  // Complete skeleton when no project name exists
  if (!displaySummary || !displaySummary.appOverview?.projectName) {
    return <ProjectSummaryNoData />
  }

  const {
    appOverview,
    targetUsers,
    coreFeatures,
    technicalApproach,
    mvpScope,
    futureConsiderations,
  } = displaySummary

  const highPriorityFeatures =
    coreFeatures?.filter(f => f?.priority === 'High') || []

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-min">
        <ProjectSummaryHeader
          appOverview={appOverview}
          targetUsers={targetUsers}
        />

        <ProjectSummaryCoreValue
          appOverview={appOverview}
          targetUsers={targetUsers}
        />

        <ProjectSummaryTechApproach technicalApproach={technicalApproach} />

        <ProjectSummaryFeatureCards
          highPriorityFeatures={highPriorityFeatures}
          coreFeatures={coreFeatures}
        />

        <ProjectSummaryMvpScope mvpScope={mvpScope} />
        <ProjectSummarySuccessMetrics mvpScope={mvpScope} />
        <ProjectSummaryVision futureConsiderations={futureConsiderations} />
        <ProjectSummaryDetails technicalApproach={technicalApproach} />
        <ProjectSummaryConstraints mvpScope={mvpScope} />
      </div>

      <ProjectSummaryFooter
        appOverview={appOverview}
        targetUsers={targetUsers}
        technicalApproach={technicalApproach}
      />
    </div>
  )
}
