import { type DeepPartial } from 'ai'
import { AlertTriangle } from 'lucide-react'
import { type z } from 'zod'
import { type summaryMvpScopeSchema } from '@/lib/schemas'
import { ListItemSkeleton } from '@/shared/components/skeleton-components'

interface ProjectSummaryConstraintsProps {
  mvpScope: DeepPartial<z.infer<typeof summaryMvpScopeSchema>> | undefined
}

export const ProjectSummaryConstraints = ({
  mvpScope,
}: ProjectSummaryConstraintsProps) => {
  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-destructive/5 rounded-2xl p-6 border border-border">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-6 h-6 text-destructive mr-3" />
        <h2 className="text-xl font-bold text-foreground">Key Constraints</h2>
      </div>
      <div className="space-y-2">
        {mvpScope?.constraints && mvpScope.constraints.length > 0 ? (
          mvpScope.constraints.slice(0, 3).map((constraint, index) => (
            <div
              key={index}
              className="flex items-start bg-background rounded-lg p-3 border border-border"
            >
              <AlertTriangle className="w-4 h-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-foreground text-sm">{constraint}</span>
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
