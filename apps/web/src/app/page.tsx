'use client'

import Link from 'next/link'
import { PlusIcon, ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-4">
      <div className="text-center space-y-8">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Button asChild size="lg" className="px-8 py-3">
            <Link href="/projects/new" className="flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Start New Project
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-3">
            <Link href="/projects" className="flex items-center gap-2">
              View Projects
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
