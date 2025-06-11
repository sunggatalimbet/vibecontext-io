'use server'

import { eq } from 'drizzle-orm'
import { db } from '../client'
import { Project, ProjectWithDocs, projects } from '../schema'
import { initDatabaseConnection } from '../utils'

export async function getUserProjects(): Promise<Array<Project>> {
  const user = await initDatabaseConnection()

  const userProjects: Array<Project> = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, user.id))

  return userProjects
}

export async function getUserProjectsWithDocs(): Promise<
  Array<ProjectWithDocs>
> {
  const user = await initDatabaseConnection()

  const userProjectsWithDocs = await db.query.projects.findMany({
    where: eq(projects.userId, user.id),
    with: {
      docs: true,
    },
  })

  return userProjectsWithDocs
}
