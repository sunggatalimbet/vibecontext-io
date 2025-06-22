import { CheckCircleIcon } from 'lucide-react'
import { CreateProjectButton } from '@/features/project/create'
import { useConversation } from './conversation-provider'

export const ConversationComplete = () => {
  const { conversation } = useConversation()

  return (
    <>
      <section className="p-4 mx-4 my-2 bg-muted/50 rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold">Discovery Complete!</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Great work! I&apos;ve gathered all the information needed about your
          app idea. Now let&apos;s create your project and generate the
          documentation.
        </p>

        <CreateProjectButton conversationId={conversation.id} />
      </section>
    </>
  )
}
