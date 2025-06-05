import { type NextRequest, NextResponse } from 'next/server'
import { createClientServer } from '@repo/auth'

// Type definition for the expected JSON summary structure based on chatBotSummaryPrompt
interface AppIdeaSummary {
  appOverview: {
    projectName: string
    purpose: string
    coreValue: string
    usageContext: string
  }
  targetUsers: {
    primary: string
    secondary?: string
    characteristics: Array<string>
    techComfort: string
  }
  coreFeatures: Array<{
    featureName: string
    description: string
    userStories: Array<string>
    priority: string
  }>
  userWorkflow: {
    primaryActions: Array<string>
    dataInputs: Array<string>
    dataOutputs: Array<string>
    typicalSession: string
  }
  technicalApproach: {
    authentication: {
      required: boolean
      type: string
      reasoning: string
    }
    dataStorage: {
      persistence: boolean
      location: string
      crossDevice: boolean
      dataRecovery: boolean
    }
    platform: {
      primary: string
      responsive: boolean
      offline: boolean
      specialRequirements: Array<string>
    }
  }
  userExperience: {
    mainScreen: string
    navigation: string
    visualStyle: string
    accessibility: Array<string>
    keyUIPatterns: Array<string>
  }
  mvpScope: {
    mustHave: Array<string>
    wontHave: Array<string>
    constraints: Array<string>
    successCriteria: Array<string>
  }
  futureConsiderations: Array<string>
}

interface CreateProjectRequest {
  appIdeaSummary: AppIdeaSummary
}

interface CreateProjectResponse {
  success: true
  project: {
    id: string
    name: string
    createdAt: string
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClientServer()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = (await request.json()) as CreateProjectRequest
    const { appIdeaSummary } = body

    if (!appIdeaSummary || typeof appIdeaSummary !== 'object') {
      return NextResponse.json(
        { error: 'App idea summary is required and must be an object' },
        { status: 400 }
      )
    }

    // Extract project name from the summary
    const projectName = appIdeaSummary.appOverview?.projectName
    if (!projectName || typeof projectName !== 'string') {
      return NextResponse.json(
        { error: 'Project name is required in appOverview.projectName' },
        { status: 400 }
      )
    }

    // Dynamic import to avoid build-time database connection
    const { db, projects } = await import('@repo/db')

    // Create project in database
    const [newProject] = await db
      .insert(projects)
      .values({
        userId: user.id,
        name: projectName.trim(),
        appIdeaSummaryJson: appIdeaSummary,
      })
      .returning({
        id: projects.id,
        name: projects.name,
        createdAt: projects.createdAt,
      })

    const response: CreateProjectResponse = {
      success: true,
      project: {
        id: newProject.id,
        name: newProject.name,
        createdAt: newProject.createdAt.toISOString(),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error creating project:', error)

    // Handle specific database errors
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
