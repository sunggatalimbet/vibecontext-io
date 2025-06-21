import 'server-only'
import { eq, and } from 'drizzle-orm'
import { db } from '../client'
import { docs, projects } from '../schema'
import { withAuth } from '../utils'

export async function getUserProjectDocuments(projectId: string | null) {
  if (!projectId) return []

  return withAuth(async user => {
    return await db
      .select()
      .from(docs)
      .where(and(eq(docs.projectId, projectId), eq(projects.userId, user.id)))
  })
}
