'use server'

import { eq, and } from 'drizzle-orm'
import { db } from '../client'
import { docs, projects } from '../schema'
import { initDatabaseConnection } from '../utils'

export async function getProjectDocuments(projectId: string | null) {
  if (!projectId) return []
  const user = await initDatabaseConnection()

  const projectDocs = await db
    .select()
    .from(docs)
    .where(and(eq(docs.projectId, projectId), eq(projects.userId, user.id)))

  return projectDocs
}
