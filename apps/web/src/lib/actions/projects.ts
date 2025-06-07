'use server'

import { db, initDatabaseConnection, projects } from '@repo/db'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export async function getProjectByChatId(chatId: string) {
  try {
    const user = await initDatabaseConnection()
    if (!user) {
      throw Error('Unauthorized access')
    }

    const results = await db
      .select()
      .from(projects)
      .where(eq(projects.conversationId, chatId))

    if (results.length === 0) {
      return null
    }

    const summary = results[0]
    return summary
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw Error('Invalid data provided', err)
    } else if (typeof err === 'string') {
      throw Error('Something went wrong' + err)
    } else {
      console.error(err)
      throw Error('Server error')
    }
  }
}
