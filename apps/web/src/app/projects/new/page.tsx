import {
  InputProject,
  MessagesProject,
  ProgressProject,
  WelcomeProject,
} from '@/components/project'
import { ProjectContainer } from '../../../components/project/project-container'

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
