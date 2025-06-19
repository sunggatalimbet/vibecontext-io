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
  getUserProjectDataById,
} from '@/lib/actions'

interface CreateProjectProps {
  id: string
}

export async function CreateProject({ id }: CreateProjectProps) {
  const [conversationData, conversationMessagesData, projectData] =
    await Promise.all([
      getConversationDataById(id),
      getConversationDataMessages(id),
      getUserProjectDataById(id),
    ])

  return (
    <ProjectProvider
      conversationData={conversationData}
      conversationMessagesData={conversationMessagesData}
      projectData={projectData}
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
