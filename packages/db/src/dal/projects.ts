import 'server-only'
import { eq } from 'drizzle-orm'
import { db } from '../client'
import { InvalidInputError } from '../errors'
import { Project, ProjectWithDocs, projects } from '../schema'
import { withAuth } from '../utils'

export async function getUserProjects(): Promise<Array<Project>> {
  return withAuth(async user => {
    return await db.select().from(projects).where(eq(projects.userId, user.id))
  })
}

export async function getUserProjectsWithDocs(): Promise<
  Array<ProjectWithDocs>
> {
  return withAuth(async user => {
    return await db.query.projects.findMany({
      where: eq(projects.userId, user.id),
      with: {
        docs: true,
      },
    })
  })
}

export type CreateProjectSummaryDto = {
  conversationId: string
  name: string
  appIdeaSummaryJson: Record<string, unknown>
}

export async function createProjectSummary({
  conversationId,
  name,
  appIdeaSummaryJson,
}: CreateProjectSummaryDto) {
  // Validate input
  if (!conversationId.trim()) {
    throw new InvalidInputError('conversationId', 'Conversation ID is requred')
  }

  if (!name.trim()) {
    throw new InvalidInputError('name', 'Name is required')
  }

  return withAuth(async user => {
    return await db.insert(projects).values({
      name,
      appIdeaSummaryJson,
      conversationId,
      userId: user.id,
    })
  })
}
