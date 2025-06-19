import {
  ProjectInput,
  ProjectMessages,
  ProjectProgress,
  ProjectProvider,
  ProjectWelcome,
  ProjectWelcomeContainer,
} from '@repo/web/src/entities/project/ui'
import {
  getConversationDataById,
  getConversationDataMessages,
} from '@/lib/actions'

interface CreateProjectProps {
  id: string
}

export async function CreateProject({ id }: CreateProjectProps) {
  const [conversationData, conversationMessagesData] = await Promise.all([
    getConversationDataById(id),
    getConversationDataMessages(id),
  ])

  return (
    <ProjectProvider
      conversationData={conversationData}
      conversationMessagesData={conversationMessagesData}
    >
      <ProjectProgress />
      <ProjectWelcomeContainer>
        <ProjectWelcome />
      </ProjectWelcomeContainer>
      <ProjectMessages />
      <ProjectInput />
    </ProjectProvider>
  )
}
