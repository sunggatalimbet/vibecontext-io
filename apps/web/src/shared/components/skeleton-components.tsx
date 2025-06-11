import { cn } from '@/shared/lib/utils'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn('animate-pulse rounded-md bg-muted/50', className)} />
  )
}

export const TextSkeleton = ({ className }: SkeletonProps) => {
  return <Skeleton className={cn('h-4 w-full', className)} />
}

export const TitleSkeleton = ({ className }: SkeletonProps) => {
  return <Skeleton className={cn('h-6 w-3/4', className)} />
}

export const HeaderSkeleton = ({ className }: SkeletonProps) => {
  return <Skeleton className={cn('h-8 w-2/3', className)} />
}

export const IconSkeleton = ({ className }: SkeletonProps) => {
  return <Skeleton className={cn('h-6 w-6 rounded-full', className)} />
}

export const ButtonSkeleton = ({ className }: SkeletonProps) => {
  return <Skeleton className={cn('h-10 w-24 rounded-lg', className)} />
}

export const CardSkeleton = ({
  className,
  children,
}: SkeletonProps & { children?: React.ReactNode }) => {
  return (
    <div
      className={cn('bg-card rounded-2xl p-6 border border-border', className)}
    >
      {children}
    </div>
  )
}

export const ListItemSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'flex items-start bg-background rounded-lg p-3 border border-border',
        className
      )}
    >
      <IconSkeleton className="mr-2 mt-0.5 flex-shrink-0" />
      <TextSkeleton className="flex-1" />
    </div>
  )
}
