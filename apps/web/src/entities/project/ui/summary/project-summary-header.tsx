import { type DeepPartial } from 'ai'
import { Award, Users } from 'lucide-react'
import { type z } from 'zod'
import {
  type summaryTargetUsersSchema,
  type summaryAppOverviewSchema,
} from '@/lib/schemas'
import { IconSkeleton, Skeleton } from '@/shared/components/skeleton-components'

interface ProjectSummaryHeaderSkeletonProps {
  appOverview: DeepPartial<z.infer<typeof summaryAppOverviewSchema>>
  targetUsers: DeepPartial<z.infer<typeof summaryTargetUsersSchema>> | undefined
}

export const ProjectSummaryHeader = ({
  appOverview,
  targetUsers,
}: ProjectSummaryHeaderSkeletonProps) => {
  const primaryUser = targetUsers?.[0]

  return (
    <div className="col-span-1 md:col-span-4 lg:col-span-6 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/50 rounded-2xl p-8 text-primary-foreground relative overflow-hidden border border-border/20">
      {/* Subtle pattern overlay for texture */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-foreground/5 via-transparent to-primary-foreground/10 rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-primary-foreground/20 backdrop-blur-sm p-4 rounded-full">
            <Award className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4 drop-shadow-sm">
          {appOverview.projectName}
        </h1>
        {appOverview.purpose ? (
          <p className="text-xl text-center text-primary-foreground/90 max-w-4xl mx-auto mb-6 leading-relaxed drop-shadow-sm">
            {appOverview.purpose}
          </p>
        ) : (
          <div className="max-w-4xl mx-auto mb-6 text-center">
            <Skeleton className="h-6 w-4/5 mx-auto mb-2 bg-primary-foreground/20" />
            <Skeleton className="h-6 w-3/4 mx-auto bg-primary-foreground/20" />
          </div>
        )}
        {targetUsers ? (
          <div className="flex items-center justify-center text-primary-foreground/90 drop-shadow-sm">
            <Users className="w-5 h-5 mr-2" />
            <span className="font-medium">{primaryUser?.primary}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <IconSkeleton className="w-5 h-5 mr-2 bg-primary-foreground/20" />
            <Skeleton className="h-4 w-32 bg-primary-foreground/20" />
          </div>
        )}
      </div>
    </div>
  )
}
