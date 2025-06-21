'use server'

import { getErrorDetails, getUserProjectById } from '@repo/db'

export async function getUserProjectByIdAction(projectId: string) {
  try {
    if (!projectId || typeof projectId !== 'string') {
      throw new Error('Invalid project ID provided')
    }

    const project = await getUserProjectById(projectId)
    return { success: true as const, data: project }
  } catch (err) {
    const errorDetails = getErrorDetails(err)

    return {
      success: false as const,
      error: {
        message: errorDetails.message,
        code: errorDetails.code,
        statusCode: errorDetails.statusCode,
      },
    }
  }
}
