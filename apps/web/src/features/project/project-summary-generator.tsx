'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SparklesIcon, RefreshCwIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

interface ProjectSummaryGeneratorProps {
  conversationId: string
}

export function ProjectSummaryGenerator({
  conversationId,
}: ProjectSummaryGeneratorProps) {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateProject = useCallback(async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Call the summary API - it will create the project and generate summary
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: conversationId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate summary')
      }

      // Handle the streaming response
      const reader = response.body?.getReader()
      if (reader) {
        // Process the stream
        // After completion, redirect to the projects page
        // The project will be created by the onFinish callback
        setTimeout(() => {
          router.push('/projects')
        }, 1000) // Give time for the project to be created
      }
    } catch (error) {
      console.error('Failed to generate summary:', error)
      setError('Failed to generate project. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }, [conversationId, router])

  // Auto-start generation when component mounts
  useEffect(() => {
    void generateProject()
  }, [generateProject])

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <SparklesIcon className="h-5 w-5" />
          {isGenerating ? 'Generating Project' : 'Generate Project'}
        </CardTitle>
        <CardDescription>
          Creating a comprehensive project overview from your conversation
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex flex-col items-center gap-4">
          {isGenerating && (
            <div className="flex items-center gap-2">
              <RefreshCwIcon className="h-6 w-6 animate-spin" />
              <span>Generating project summary...</span>
            </div>
          )}

          {error && (
            <div className="text-sm text-destructive">
              {error}
              <Button
                onClick={generateProject}
                variant="outline"
                size="sm"
                className="ml-2"
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
