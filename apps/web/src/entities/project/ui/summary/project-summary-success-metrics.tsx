import { type DeepPartial } from 'ai'
import { BarChart3, TrendingUp } from 'lucide-react'
import { type z } from 'zod'
import { type summaryMvpScopeSchema } from '@/lib/schemas'
import { ListItemSkeleton } from '@/shared/components/skeleton-components'

interface ProjectSummarySuccessMetricsProps {
  mvpScope: DeepPartial<z.infer<typeof summaryMvpScopeSchema>> | undefined
}

export const ProjectSummarySuccessMetrics = ({
  mvpScope,
}: ProjectSummarySuccessMetricsProps) => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center mb-4">
        <BarChart3 className="w-7 h-7 text-primary mr-3" />
        <h2 className="text-2xl font-bold text-card-foreground">
          Success Metrics
        </h2>
      </div>
      <div className="space-y-3">
        {mvpScope?.successCriteria && mvpScope.successCriteria.length > 0 ? (
          mvpScope.successCriteria.slice(0, 3).map((criteria, index) => (
            <div
              key={index}
              className="bg-secondary rounded-lg p-4 border border-border"
            >
              <div className="flex items-start">
                <TrendingUp className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-foreground text-sm leading-relaxed">
                  {criteria}
                </span>
              </div>
            </div>
          ))
        ) : (
          <>
            {[1, 2, 3].map(i => (
              <ListItemSkeleton key={i} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
