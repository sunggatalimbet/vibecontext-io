import {
  InputProject,
  MessagesProject,
  ProgressProject,
  WelcomeProject,
  ProjectContainer,
} from '@/components/project'
import { getChat, getChatMessages, getProjectByChatId } from '@/lib/actions'

interface NewProjectPageProps {
  params: { id: string }
}

export default async function NewProjectPage({ params }: NewProjectPageProps) {
  const chat = await getChat(params.id)
  const chatMessages = await getChatMessages(params.id)
  const project = await getProjectByChatId(params.id)

  return (
    <ProjectContainer chatMessages={chatMessages} chat={chat} project={project}>
      <ProgressProject />
      <WelcomeProject />
      <MessagesProject />
      <InputProject />
    </ProjectContainer>
  )
}
