'use client'

import { MessageCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProject } from './project-container'

export const WelcomeProject = () => {
  const { messages } = useProject()
  const welcomeContainer = cn(
    'flex flex-col items-center justify-center flex-shrink-0 text-center transition-all duration-500 ease-in-out',
    {
      'opacity-0 -translate-y-4 h-0 overflow-hidden': messages.length > 0,
      'opacity-100 translate-y-0': messages.length < 0,
    }
  )

  return (
    <section className={welcomeContainer}>
      <h1 className="text-4xl font-bold font-satoshi italic tracking-tight mb-4">
        Let&apos;s create your new project
      </h1>
      <p className="text-lg text-muted-foreground font-satoshi italic">
        Share your app idea and I&apos;ll help you develop it into a structured
        project
      </p>
      <div className="mt-6 text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <MessageCircleIcon className="h-4 w-4" />
          <span>10 focused questions to capture your vision</span>
        </div>
      </div>
    </section>
  )
}
