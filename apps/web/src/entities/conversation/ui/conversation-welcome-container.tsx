'use client'

import { cn } from '@/shared/lib/utils'
import { useConversation } from './conversation-provider'

interface ConversationWelcomeContainerProps {
  children: React.ReactNode
}

export const ConversationWelcomeContainer = ({
  children,
}: ConversationWelcomeContainerProps) => {
  const { messages } = useConversation()
  const welcomeContainer = cn(
    'flex flex-col items-center justify-center flex-shrink-0 text-center transition-all duration-500 ease-in-out',
    {
      'opacity-0 -translate-y-4 h-0 overflow-hidden': messages.length > 0,
      'opacity-100 translate-y-0': messages.length < 0,
    }
  )

  return <section className={welcomeContainer}>{children}</section>
}
