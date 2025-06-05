import { type NextRequest, NextResponse } from 'next/server'
import { getLLMService } from '@repo/ai'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { message?: unknown }
    const { message } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    const llmService = getLLMService()
    const response = await llmService.sendMessage(message)

    return NextResponse.json({
      success: true,
      response,
    })
  } catch (error) {
    console.error('Error in idea generation chat:', error)

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

export async function DELETE(_request: NextRequest) {
  try {
    const llmService = getLLMService()
    await llmService.clearMemory()

    return NextResponse.json({
      success: true,
      message: 'Chat memory cleared',
    })
  } catch (error) {
    console.error('Error clearing chat memory:', error)
    return NextResponse.json(
      { error: 'Failed to clear chat memory' },
      { status: 500 }
    )
  }
}
