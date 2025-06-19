import { Suspense } from 'react'
import {
  CreateProject,
  CreateProjectSkeleton,
} from '@repo/web/src/features/project/create'

interface NewProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function NewProjectPage({ params }: NewProjectPageProps) {
  const { id } = await params

  return (
    <Suspense fallback={<CreateProjectSkeleton />}>
      <CreateProject id={id} />
    </Suspense>
  )
}
