import { type DeepPartial } from 'ai'
import { CheckCircle, TrendingUp } from 'lucide-react'
import { type z } from 'zod'
import { type summaryMvpScopeSchema } from '@/lib/schemas'
import {
  ListItemSkeleton,
  TitleSkeleton,
} from '@/shared/components/skeleton-components'

interface ProjectSummaryMvpScopeProps {
  mvpScope: DeepPartial<z.infer<typeof summaryMvpScopeSchema>> | undefined
}

export const ProjectSummaryMvpScope = ({
  mvpScope,
}: ProjectSummaryMvpScopeProps) => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-accent rounded-2xl p-6 border border-border">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-7 h-7 text-accent-foreground mr-3" />
        <h2 className="text-2xl font-bold text-accent-foreground">
          MVP Essentials
        </h2>
      </div>
      <div className="space-y-4">
        {mvpScope?.mustHave && mvpScope.mustHave.length > 0 ? (
          <div>
            <h3 className="font-semibold text-accent-foreground mb-3">
              Must-Have Features
            </h3>
            <div className="space-y-2">
              {mvpScope.mustHave.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start bg-background rounded-lg p-3 border border-border"
                >
                  <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <TitleSkeleton className="mb-3 w-40" />
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <ListItemSkeleton key={i} />
              ))}
            </div>
          </div>
        )}
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Development Phase
            </span>
            <span className="text-2xl font-bold text-primary">MVP</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Ready for validation
          </p>
        </div>
      </div>
    </div>
  )
}
