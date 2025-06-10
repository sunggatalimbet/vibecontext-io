'use server'

import { eq } from 'drizzle-orm'
import { db } from '../client'
import { Project, projects } from '../schema'
import { initDatabaseConnection } from '../utils'

export async function getUserProjects(): Promise<Array<Project>> {
  const user = await initDatabaseConnection()

  const userProjects: Array<Project> = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, user.id))

  return userProjects
}
