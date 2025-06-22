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

export async function getUserProjectById(
  projectId: string
): Promise<Project | undefined> {
  if (!projectId.trim()) {
    throw new InvalidInputError('projectId', 'Project ID is required')
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

export async function getUserProjectByConversationId(
  conversationId: string
): Promise<Project | undefined> {
  if (!conversationId.trim()) {
    throw new InvalidInputError('conversationId', 'Conversation ID is required')
  }

  return withAuth(async user => {
    const result = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.userId, user.id),
          eq(projects.conversationId, conversationId)
        )
      )
      .limit(1)

    const project = result[0]
    return project
  })
}

export async function getUserProjectsWithDocs(): Promise<
  Array<ProjectWithDocs>
> {
  return withAuth(async user => {
    const userProjectsWithDocs = await db.query.projects.findMany({
      where: eq(projects.userId, user.id),
      with: {
        docs: true,
      },
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    })

    return userProjectsWithDocs
  })
}

export type CreateUserProjectDto = {
  conversationId: string
}

export async function createUserProject({
  conversationId,
}: CreateUserProjectDto): Promise<{ id: string }> {
  if (!conversationId.trim()) {
    throw new InvalidInputError('conversationId', 'Conversation ID is required')
  }

  return withAuth(async user => {
    const result = await db
      .insert(projects)
      .values({
        userId: user.id,
        name: 'New Project',
        conversationId: conversationId,
      })
      .returning({ id: projects.id })

    return result[0]
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
}: CreateProjectSummaryDto): Promise<Array<Project | undefined>> {
  // Validate input
  if (!conversationId.trim()) {
    throw new InvalidInputError('conversationId', 'Conversation ID is required')
  }

  if (!name.trim()) {
    throw new InvalidInputError('name', 'Name is required')
  }

  return withAuth(async user => {
    return await db
      .insert(projects)
      .values({
        name,
        appIdeaSummaryJson,
        conversationId,
        userId: user.id,
      })
      .returning()
  })
}
