import { type NextRequest, NextResponse } from 'next/server'
import { getLLMService } from '@repo/ai'

export async function POST(_request: NextRequest) {
  try {
    // Use the same LLM service instance to access conversation history
    const llmService = getLLMService()
    const summary = await llmService.generateAppIdeaSummary()
    console.log({ summary })

    return NextResponse.json({
      success: true,
      summary,
    })
  } catch (error) {
    console.error('Error generating app idea summary:', error)

    // Handle specific LLM service errors
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
