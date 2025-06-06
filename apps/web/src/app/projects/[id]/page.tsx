import {
  InputProject,
  MessagesProject,
  ProgressProject,
  WelcomeProject,
  ProjectContainer,
} from '@/components/project'

export default function NewProjectPage() {
  return (
    <ProjectContainer>
      <ProgressProject />
      <WelcomeProject />
      <MessagesProject />
      <InputProject />
    </ProjectContainer>
  )
}
