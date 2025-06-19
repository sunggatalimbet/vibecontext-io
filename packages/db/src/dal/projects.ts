import 'server-only'
import { eq, and } from 'drizzle-orm'
import { db } from '../client'
import { InvalidInputError, ResourceNotFoundError } from '../errors'
import { Project, ProjectWithDocs, projects } from '../schema'
import { withAuth } from '../utils'

export async function getUserProjects(): Promise<Array<Project>> {
  return withAuth(async user => {
    return await db.select().from(projects).where(eq(projects.userId, user.id))
  })
}

export async function getUserProjectById(projectId: string): Promise<Project> {
  if (!projectId.trim()) {
    throw new InvalidInputError('projectId', 'Project ID is requred')
  }

  return withAuth(async user => {
    const result = await db
      .select()
      .from(projects)
      .where(and(eq(projects.userId, user.id), eq(projects.id, projectId)))
      .limit(1)

    const project = result[0]
    if (!project) {
      throw new ResourceNotFoundError('Project', projectId)
    }

    return project
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
