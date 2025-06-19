import { redirect } from 'next/navigation'
import { createUserConversationAction } from '@/lib/actions/conversation'

export default async function NewConversationPage() {
  const result = await createUserConversationAction()

  if (!result.success) {
    // Handle error - could redirect to error page or show error message
    throw new Error(result.error.message ?? 'Unexpected error occurred')
  }

  // Redirect to the new conversation
  redirect(`/conversations/${result.data.id}`)
}
