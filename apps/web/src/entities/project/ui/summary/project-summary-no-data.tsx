import {
  TextSkeleton,
  TitleSkeleton,
  HeaderSkeleton,
  IconSkeleton,
  CardSkeleton,
  ListItemSkeleton,
} from '@/shared/components/skeleton-components'

export const ProjectSummaryNoData = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-min">
        {/* Header Skeleton */}
        <div className="col-span-1 md:col-span-4 lg:col-span-6 bg-gradient-to-br from-muted/90 via-muted/70 to-muted/50 rounded-2xl p-8 border border-border/20">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-muted p-4 rounded-full">
              <IconSkeleton className="w-10 h-10" />
            </div>
          </div>
          <HeaderSkeleton className="h-12 w-2/3 mx-auto mb-4" />
          <TextSkeleton className="h-6 w-4/5 mx-auto mb-6" />
          <div className="flex items-center justify-center">
            <IconSkeleton className="w-5 h-5 mr-2" />
            <TextSkeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Core Value Skeleton */}
        <CardSkeleton className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center mb-4">
            <IconSkeleton className="w-7 h-7 mr-3" />
            <HeaderSkeleton className="h-8 w-32" />
          </div>
          <div className="space-y-4">
            <div>
              <TitleSkeleton className="mb-2" />
              <TextSkeleton className="mb-2" />
              <TextSkeleton className="w-3/4" />
            </div>
            <div>
              <TitleSkeleton className="mb-2" />
              <TextSkeleton className="mb-2" />
              <TextSkeleton className="w-4/5" />
            </div>
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-1">
                <TextSkeleton className="h-4 w-24" />
                <HeaderSkeleton className="h-8 w-12" />
              </div>
              <TextSkeleton className="h-3 w-32" />
            </div>
          </div>
        </CardSkeleton>

        {/* Technical Approach Skeleton */}
        <CardSkeleton className="col-span-1 md:col-span-2 lg:col-span-3 bg-secondary">
          <div className="flex items-center mb-4">
            <IconSkeleton className="w-7 h-7 mr-3" />
            <HeaderSkeleton className="h-8 w-40" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <TextSkeleton className="h-4 w-16" />
                  <IconSkeleton className="w-4 h-4" />
                </div>
                <TitleSkeleton className="w-20" />
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <TextSkeleton className="h-4 w-20" />
                  <IconSkeleton className="w-4 h-4" />
                </div>
                <TitleSkeleton className="w-12" />
              </div>
            </div>
            <div>
              <TitleSkeleton className="mb-2" />
              <div className="space-y-2">
                <ListItemSkeleton />
                <ListItemSkeleton />
              </div>
            </div>
          </div>
        </CardSkeleton>

        {/* Feature Skeleton Cards */}
        {[1, 2, 3].map(index => (
          <CardSkeleton
            key={index}
            className="col-span-1 md:col-span-2 lg:col-span-2"
          >
            <div className="flex items-center mb-3">
              <div className="bg-primary/10 p-2 rounded-lg mr-3">
                <IconSkeleton className="w-5 h-5" />
              </div>
              <TitleSkeleton className="w-32" />
            </div>
            <TextSkeleton className="mb-2" />
            <TextSkeleton className="w-3/4 mb-4" />
            <div className="bg-secondary rounded-lg p-3 border border-border">
              <TextSkeleton className="w-5/6" />
            </div>
          </CardSkeleton>
        ))}

        {/* MVP Scope Skeleton */}
        <CardSkeleton className="col-span-1 md:col-span-2 lg:col-span-3 bg-accent">
          <div className="flex items-center mb-4">
            <IconSkeleton className="w-7 h-7 mr-3" />
            <HeaderSkeleton className="h-8 w-32" />
          </div>
          <div className="space-y-4">
            <div>
              <TitleSkeleton className="mb-3" />
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <ListItemSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </CardSkeleton>

        {/* Success Metrics Skeleton */}
        <CardSkeleton className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center mb-4">
            <IconSkeleton className="w-7 h-7 mr-3" />
            <HeaderSkeleton className="h-8 w-36" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        </CardSkeleton>

        {/* Future Vision Skeleton */}
        <CardSkeleton className="col-span-1 md:col-span-2 lg:col-span-2 bg-secondary">
          <div className="flex items-center mb-4">
            <IconSkeleton className="w-6 h-6 mr-3" />
            <HeaderSkeleton className="h-6 w-28" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        </CardSkeleton>

        {/* Platform Details Skeleton */}
        <CardSkeleton className="col-span-1 md:col-span-1 lg:col-span-2 bg-muted">
          <div className="flex items-center mb-4">
            <IconSkeleton className="w-6 h-6 mr-3" />
            <HeaderSkeleton className="h-6 w-32" />
          </div>
          <div className="space-y-3">
            <div className="bg-background rounded-lg p-3 border border-border">
              <TextSkeleton className="h-4 w-20 mb-1" />
              <TitleSkeleton className="w-12" />
            </div>
            <div className="bg-background rounded-lg p-3 border border-border">
              <TextSkeleton className="h-4 w-24 mb-1" />
              <TitleSkeleton className="w-8" />
            </div>
          </div>
        </CardSkeleton>

        {/* Constraints Skeleton */}
        <CardSkeleton className="col-span-1 md:col-span-1 lg:col-span-2 bg-destructive/5">
          <div className="flex items-center mb-4">
            <IconSkeleton className="w-6 h-6 mr-3" />
            <HeaderSkeleton className="h-6 w-32" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        </CardSkeleton>
      </div>

      {/* Footer Skeleton */}
      <div className="mt-8 bg-muted rounded-2xl p-6 border border-border text-center">
        <TextSkeleton className="h-4 w-4/5 mx-auto mb-2" />
        <TextSkeleton className="h-4 w-3/4 mx-auto mb-2" />
        <TextSkeleton className="h-4 w-5/6 mx-auto" />
      </div>
    </div>
  )
}
