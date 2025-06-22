'use server'

import {
  type DataResponse,
  getErrorDetails,
  getUserProjectById,
  createUserProject,
  type Project,
} from '@repo/db'

export async function getUserProjectByIdAction(
  projectId: string
): Promise<DataResponse<Project | undefined>> {
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

export async function createUserProjectAction(
  conversationId: string
): Promise<DataResponse<{ id: string }>> {
  try {
    if (!conversationId || typeof conversationId !== 'string') {
      throw new Error('Invalid project ID provided')
    }

    const project = await createUserProject({ conversationId })
    return {
      success: true as const,
      data: project,
    }
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
