import { type DeepPartial } from 'ai'
import { Clock } from 'lucide-react'
import { type z } from 'zod'
import { type summaryTechnicalApproachSchema } from '@/lib/schemas'
import { TitleSkeleton } from '@/shared/components/skeleton-components'

interface ProjectSummaryDetailsProps {
  technicalApproach:
    | DeepPartial<z.infer<typeof summaryTechnicalApproachSchema>>
    | undefined
}

export const ProjectSummaryDetails = ({
  technicalApproach,
}: ProjectSummaryDetailsProps) => {
  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-muted rounded-2xl p-6 border border-border">
      <div className="flex items-center mb-4">
        <Clock className="w-6 h-6 text-primary mr-3" />
        <h2 className="text-xl font-bold text-foreground">Platform Details</h2>
      </div>
      <div className="space-y-3">
        <div className="bg-background rounded-lg p-3 border border-border">
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Responsive
          </div>
          {technicalApproach?.platform?.responsive !== undefined ? (
            <div className="text-lg font-bold text-primary">
              {technicalApproach.platform.responsive ? 'Yes' : 'No'}
            </div>
          ) : (
            <TitleSkeleton className="w-12" />
          )}
        </div>
        <div className="bg-background rounded-lg p-3 border border-border">
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Offline Support
          </div>
          {technicalApproach?.platform?.offline !== undefined ? (
            <div className="text-lg font-bold text-primary">
              {technicalApproach.platform.offline ? 'Yes' : 'No'}
            </div>
          ) : (
            <TitleSkeleton className="w-8" />
          )}
        </div>
      </div>
    </div>
  )
}
