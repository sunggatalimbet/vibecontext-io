import { Skeleton } from '@/shared/components/ui/skeleton'

export function CreateProjectSkeleton() {
  return (
    <div className="flex flex-col justify-between h-full w-full max-w-none mx-auto">
      <ProjectProgressSkeleton />
      <ProjectWelcomeSkeleton />
      <ProjectSkeletonMessages />
      <ProjectInputSkeleton />
    </div>
  )
}

function ProjectProgressSkeleton() {
  return (
    <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-2">
          {/* Left side - Icon, title, badge */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-16 rounded-full ml-2" />
          </div>

          {/* Right side - Questions count, badge, button */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-md ml-2" />
          </div>
        </div>

        {/* Progress bar */}
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </div>
  )
}

function ProjectWelcomeSkeleton() {
  return (
    <section className="flex flex-col items-center justify-center flex-shrink-0 text-center transition-all duration-500 ease-in-out opacity-100 translate-y-0 py-16">
      {/* Main title */}
      <Skeleton className="h-12 w-96 mb-4" />

      {/* Subtitle */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-6 w-80 mx-auto" />
        <Skeleton className="h-6 w-72 mx-auto" />
      </div>

      {/* Bottom section with icon and text */}
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-4 w-64" />
      </div>
    </section>
  )
}

function ProjectInputSkeleton() {
  return (
    <div className="flex-shrink-0 border-t bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center pl-2 pr-4 border rounded-lg shadow-lg bg-background">
          {/* Input field */}
          <Skeleton className="flex-1 h-18 bg-transparent" />
          {/* Send button */}
          <Skeleton className="rounded-md flex-shrink-0 w-10 h-10 ml-2" />
        </div>
      </div>
    </div>
  )
}

function ProjectSkeletonMessages() {
  return (
    <div className="flex-1 w-full">
      <div className="flex flex-col w-full min-h-full px-6 py-8">
        <div className="flex flex-col gap-2 flex-1">
          {/* User message (sent) */}
          <div className="flex items-start gap-3 mb-6 w-full flex-row-reverse justify-start">
            <div className="rounded-xl px-4 py-3 max-w-[70%] bg-primary/10 ml-auto">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-48 mt-2" />
            </div>
          </div>

          {/* AI message (received) */}
          <div className="flex items-start gap-3 w-full justify-start">
            {/* Avatar skeleton */}
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />

            {/* Message content skeleton */}
            <div className="rounded-xl px-4 py-3 max-w-[70%] bg-muted/50 mr-auto">
              <Skeleton className="h-4 w-80 mb-2" />
              <Skeleton className="h-4 w-72 mb-2" />
              <Skeleton className="h-4 w-64 mb-2" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Alternative: Skeleton with messages (for when there are existing messages)
export function CreateProjectSkeletonWithMessages() {
  return (
    <div className="flex flex-col justify-between h-full w-full max-w-none mx-auto">
      <ProjectProgressSkeleton />

      {/* Messages area skeleton */}
      <ProjectMessagesSkeleton />

      <ProjectInputSkeleton />
    </div>
  )
}

function ProjectMessagesSkeleton() {
  return (
    <div className="flex-1 overflow-hidden max-h-[72vh] p-4">
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[70%]">
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        </div>

        {/* AI response */}
        <div className="flex justify-start gap-3">
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          <div className="max-w-[70%] space-y-2">
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        </div>

        {/* Another user message */}
        <div className="flex justify-end">
          <div className="max-w-[70%]">
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>

        {/* Another AI response */}
        <div className="flex justify-start gap-3">
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          <div className="max-w-[70%] space-y-2">
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton for completed project state
export function CreateProjectSkeletonCompleted() {
  return (
    <div className="flex flex-col justify-between h-full w-full max-w-none mx-auto">
      <ProjectProgressSkeletonCompleted />
      <ProjectMessagesSkeleton />
      <ProjectInputSkeletonCompleted />
    </div>
  )
}

function ProjectProgressSkeletonCompleted() {
  return (
    <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-32" />
            {/* Complete badge skeleton */}
            <div className="flex items-center gap-1 ml-2">
              <Skeleton className="h-3 w-3 rounded-sm" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            {/* Full View button skeleton */}
            <div className="flex items-center gap-1.5 ml-2">
              <Skeleton className="h-3 w-3 rounded-sm" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </div>

        {/* Full progress bar */}
        <Skeleton className="h-2 w-full rounded-full bg-primary/20" />
      </div>
    </div>
  )
}

function ProjectInputSkeletonCompleted() {
  return (
    <div className="flex-shrink-0 border-t bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center p-4">
          <Skeleton className="h-4 w-80 mx-auto mb-2" />
        </div>
      </div>
    </div>
  )
}
