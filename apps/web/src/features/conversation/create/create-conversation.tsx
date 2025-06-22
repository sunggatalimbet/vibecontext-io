import {
  ConversationInput,
  ConversationMessages,
  ConversationProgress,
  ConversationProvider,
  ConversationWelcome,
  ConversationWelcomeContainer,
} from '@/entities/conversation/ui'
import {
  getConversationByIdAction,
  getConversationMessagesAction,
} from '@/lib/actions'

interface CreateConversationProps {
  id: string
}

export async function CreateConversation({ id }: CreateConversationProps) {
  const [conversationData, conversationMessagesData] = await Promise.all([
    getConversationByIdAction(id),
    getConversationMessagesAction(id),
  ])

  return (
    <ConversationProvider
      conversationData={conversationData}
      conversationMessagesData={conversationMessagesData}
    >
      <ConversationProgress />
      <ConversationWelcomeContainer>
        <ConversationWelcome />
      </ConversationWelcomeContainer>
      <ConversationMessages />
      <ConversationInput />
    </ConversationProvider>
  )
}
