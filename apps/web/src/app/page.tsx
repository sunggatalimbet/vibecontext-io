import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { CreateProjectButton } from '@/features/project/create'
import { Button } from '@/shared/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-4 text-center space-y-8">
      {/* Hero Text */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold font-satoshi italic tracking-tight">
          Welcome to vibecontext.io
        </h1>
        <p className="text-xl text-muted-foreground font-satoshi italic max-w-2xl mx-auto">
          Transform your app ideas into structured development plans with
          AI-powered assistance
        </p>
      </div>

      {/* Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
        <div className="space-y-2">
          <div className="text-2xl">💡</div>
          <h3 className="font-semibold">Share Your Idea</h3>
          <p className="text-sm text-muted-foreground">
            Start with a conversation about your app concept
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-2xl">📋</div>
          <h3 className="font-semibold">Get Documentation</h3>
          <p className="text-sm text-muted-foreground">
            Receive structured PRDs and technical requirements
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-2xl">🚀</div>
          <h3 className="font-semibold">Start Building</h3>
          <p className="text-sm text-muted-foreground">
            Use AI-generated prompts to guide development
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
        <CreateProjectButton
          variant={'outline'}
          size="lg"
          className="px-8 py-3"
        />
        <Button asChild variant="outline" size="lg" className="px-8 py-3">
          <Link href="/projects" className="flex items-center gap-2">
            <span>View Projects</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
