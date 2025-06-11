import { type DeepPartial } from 'ai'
import { Target } from 'lucide-react'
import { type z } from 'zod'
import {
  type summaryTargetUsersSchema,
  type summaryAppOverviewSchema,
} from '@/lib/schemas'
import {
  HeaderSkeleton,
  TextSkeleton,
} from '@/shared/components/skeleton-components'

interface ProjectSummaryCoreValueProps {
  appOverview: DeepPartial<z.infer<typeof summaryAppOverviewSchema>>
  targetUsers: DeepPartial<z.infer<typeof summaryTargetUsersSchema>> | undefined
}

export const ProjectSummaryCoreValue = ({
  appOverview,
  targetUsers,
}: ProjectSummaryCoreValueProps) => {
  const primaryUser = targetUsers?.[0]

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center mb-4">
        <Target className="w-7 h-7 text-primary mr-3" />
        <h2 className="text-2xl font-bold text-card-foreground">Core Value</h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-card-foreground mb-2">
            Main Benefit
          </h3>
          {appOverview.coreValue ? (
            <p className="text-muted-foreground leading-relaxed">
              {appOverview.coreValue}
            </p>
          ) : (
            <div className="space-y-2">
              <TextSkeleton />
              <TextSkeleton className="w-3/4" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground mb-2">
            Usage Context
          </h3>
          {appOverview.usageContext ? (
            <p className="text-muted-foreground leading-relaxed">
              {appOverview.usageContext}
            </p>
          ) : (
            <div className="space-y-2">
              <TextSkeleton />
              <TextSkeleton className="w-4/5" />
            </div>
          )}
        </div>
        {primaryUser?.techComfort ? (
          <div className="bg-secondary rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary-foreground">
                Tech Comfort
              </span>
              <span className="text-2xl font-bold text-primary">
                {primaryUser.techComfort}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Target user capability
            </p>
          </div>
        ) : (
          <div className="bg-secondary rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <TextSkeleton className="h-4 w-24" />
              <HeaderSkeleton className="h-8 w-12" />
            </div>
            <TextSkeleton className="h-3 w-32 mt-1" />
          </div>
        )}
      </div>
    </div>
  )
}
