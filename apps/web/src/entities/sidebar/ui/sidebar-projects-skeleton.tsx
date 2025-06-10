import { Skeleton } from '@/shared/components/ui/skeleton'

export const SidebarProjectsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-full justify-start gap-2 px-2 h-9 flex items-center rounded-md"
        >
          <Skeleton className="h-4 w-full ml-2" />
        </div>
      ))}
    </>
  )
}
