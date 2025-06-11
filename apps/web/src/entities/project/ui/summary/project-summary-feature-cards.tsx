import { type DeepPartial } from 'ai'
import { BarChart3, Star, Zap } from 'lucide-react'
import { type z } from 'zod'
import { type summaryCoreFeaturesSchema } from '@/lib/schemas'
import {
  CardSkeleton,
  IconSkeleton,
  TextSkeleton,
  TitleSkeleton,
} from '@/shared/components/skeleton-components'

interface ProjectSummaryFeatureCardsProps {
  highPriorityFeatures: DeepPartial<z.infer<typeof summaryCoreFeaturesSchema>>
  coreFeatures:
    | DeepPartial<z.infer<typeof summaryCoreFeaturesSchema>>
    | undefined
}

export const ProjectSummaryFeatureCards = ({
  highPriorityFeatures,
  coreFeatures,
}: ProjectSummaryFeatureCardsProps) => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => {
        const feature = highPriorityFeatures[index] || coreFeatures?.[index]

        if (feature) {
          return (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-2 bg-card rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center mb-3">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  {index === 0 && <Star className="w-5 h-5 text-primary" />}
                  {index === 1 && <Zap className="w-5 h-5 text-primary" />}
                  {index === 2 && (
                    <BarChart3 className="w-5 h-5 text-primary" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-card-foreground">
                  {feature.featureName}
                </h3>
              </div>
              {feature.description ? (
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>
              ) : (
                <div className="mb-4 space-y-2">
                  <TextSkeleton />
                  <TextSkeleton className="w-3/4" />
                </div>
              )}
              {feature.userStories?.[0] ? (
                <div className="bg-secondary rounded-lg p-3 border border-border">
                  <p className="text-secondary-foreground text-sm font-medium italic">
                    {feature.userStories[0]}
                  </p>
                </div>
              ) : (
                <div className="bg-secondary rounded-lg p-3 border border-border">
                  <TextSkeleton className="w-5/6" />
                </div>
              )}
            </div>
          )
        }

        // Show skeleton for missing features
        return (
          <CardSkeleton
            key={`skeleton-${index}`}
            className="col-span-1 md:col-span-2 lg:col-span-2"
          >
            <div className="flex items-center mb-3">
              <div className="bg-primary/10 p-2 rounded-lg mr-3">
                <IconSkeleton className="w-5 h-5" />
              </div>
              <TitleSkeleton className="w-32" />
            </div>
            <div className="mb-4 space-y-2">
              <TextSkeleton />
              <TextSkeleton className="w-3/4" />
            </div>
            <div className="bg-secondary rounded-lg p-3 border border-border">
              <TextSkeleton className="w-5/6" />
            </div>
          </CardSkeleton>
        )
      })}
    </>
  )
}
