import { Suspense } from 'react'
import {
  CreateConversation,
  CreateConversationSkeleton,
} from '@/features/conversation/create'

interface ConversationPageProps {
  params: Promise<{ id: string }>
}

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const { id } = await params

  return (
    <Suspense fallback={<CreateConversationSkeleton />}>
      <CreateConversation id={id} />
    </Suspense>
  )
}
