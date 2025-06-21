import { Suspense } from 'react'
import { ProjectSummaryNoData } from '@/entities/project/ui/summary'
import { ViewProjectSummaryCardContainer } from '@/features/project/view'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<ProjectSummaryNoData />}>
      <ViewProjectSummaryCardContainer params={params} />
    </Suspense>
  )
}
