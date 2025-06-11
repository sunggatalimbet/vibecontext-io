import { type DeepPartial } from 'ai'
import { type z } from 'zod'
import {
  type summaryTechnicalApproachSchema,
  type summaryAppOverviewSchema,
  type summaryTargetUsersSchema,
} from '@/lib/schemas'
import { TextSkeleton } from '@/shared/components/skeleton-components'

interface ProjectSummaryFooterProps {
  appOverview: DeepPartial<z.infer<typeof summaryAppOverviewSchema>>
  technicalApproach:
    | DeepPartial<z.infer<typeof summaryTechnicalApproachSchema>>
    | undefined
  targetUsers: DeepPartial<z.infer<typeof summaryTargetUsersSchema>> | undefined
}

export const ProjectSummaryFooter = ({
  appOverview,
  technicalApproach,
  targetUsers,
}: ProjectSummaryFooterProps) => {
  const primaryUser = targetUsers?.[0]

  return (
    <div className="mt-8 bg-muted rounded-2xl p-6 border border-border text-center">
      {appOverview.projectName &&
      primaryUser?.primary &&
      technicalApproach?.platform?.primary ? (
        <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto">
          <strong className="text-foreground">{appOverview.projectName}</strong>{' '}
          represents a focused solution for {primaryUser.primary}
          seeking systematic improvement. With a{' '}
          {technicalApproach.platform.primary.toLowerCase()}-first approach and
          emphasis on interactive experience, this MVP targets a proven market
          need with clear success metrics and a strong foundation for future
          growth.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-2">
          <TextSkeleton className="w-4/5 mx-auto" />
          <TextSkeleton className="w-3/4 mx-auto" />
          <TextSkeleton className="w-5/6 mx-auto" />
        </div>
      )}
    </div>
  )
}
