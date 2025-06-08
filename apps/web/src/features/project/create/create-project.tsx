import {
  ProjectInput,
  ProjectMessages,
  ProjectProgress,
  ProjectProvider,
  ProjectWelcome,
  ProjectWelcomeContainer,
} from '@repo/web/src/entities/project/ui'
import { getChat, getChatMessages, getProjectByChatId } from '@/lib/actions'

interface CreateProjectProps {
  id: string
}

export async function CreateProject({ id }: CreateProjectProps) {
  const [chat, chatMessages, project] = await Promise.all([
    getChat(id),
    getChatMessages(id),
    getProjectByChatId(id),
  ])

  return (
    <ProjectProvider chatMessages={chatMessages} chat={chat} project={project}>
      <ProjectProgress />
      <ProjectWelcomeContainer>
        <ProjectWelcome />
      </ProjectWelcomeContainer>
      <ProjectMessages />
      <ProjectInput />
    </ProjectProvider>
  )
}
