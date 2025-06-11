import { type DeepPartial } from 'ai'
import { Calendar, Lightbulb } from 'lucide-react'
import { type z } from 'zod'
import { type summaryFutureConsiderationsSchema } from '@/lib/schemas'
import { ListItemSkeleton } from '@/shared/components/skeleton-components'

interface ProjectSummaryVisionProps {
  futureConsiderations:
    | DeepPartial<z.infer<typeof summaryFutureConsiderationsSchema>>
    | undefined
}

export const ProjectSummaryVision = ({
  futureConsiderations,
}: ProjectSummaryVisionProps) => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-secondary rounded-2xl p-6 border border-border">
      <div className="flex items-center mb-4">
        <Lightbulb className="w-6 h-6 text-accent-foreground mr-3" />
        <h2 className="text-xl font-bold text-secondary-foreground">
          Future Vision
        </h2>
      </div>
      <div className="space-y-3">
        {futureConsiderations && futureConsiderations.length > 0 ? (
          futureConsiderations.slice(0, 3).map((consideration, index) => (
            <div
              key={index}
              className="flex items-start bg-background rounded-lg p-3 border border-border"
            >
              <Calendar className="w-4 h-4 text-accent-foreground mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-foreground text-sm">{consideration}</span>
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
