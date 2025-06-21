/**
 * @file: view-project-summary-card.tsx
 * @description: Bento Grid Project Summary Card component for displaying comprehensive project analysis
 * @dependencies: summarySchema types, Lucide React icons, skeleton components
 * @created: 2025-01-07
 */

import { type DeepPartial } from 'ai'
import { type z } from 'zod'
import { type MockDataState } from '@/entities/project/lib/mock/project-summary'
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
import { type summarySchema } from '@/lib/schemas'

interface ProjectSummaryCardProps {
  summary: DeepPartial<z.infer<typeof summarySchema>>
  // Testing prop to override with mock data
  testingMode?: MockDataState
}

export const ViewProjectSummaryCard = ({
  summary,
}: ProjectSummaryCardProps) => {
  const {
    appOverview,
    targetUsers,
    coreFeatures,
    technicalApproach,
    mvpScope,
    futureConsiderations,
  } = summary

  // Complete skeleton when no project name exists

  if (!appOverview?.projectName) {
    return <ProjectSummaryNoData />
  }

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
