'use client'

import type * as React from 'react'
import { ArrowDown } from 'lucide-react'
import { useAutoScroll } from '@/lib/hooks/use-auto-scroll'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

interface ChatMessageListProps {
  className?: string
  children?: React.ReactNode
  smooth?: boolean
}

export function ChatMessageList({
  className,
  children,
  smooth = false,
}: ChatMessageListProps) {
  const {
    scrollRef,
    isAtBottom,
    autoScrollEnabled: _autoScrollEnabled,
    scrollToBottom,
    disableAutoScroll,
  } = useAutoScroll({
    smooth,
    content: children,
  })

  return (
    <div className={cn('relative flex-1 w-full h-full', className)}>
      <div
        className="h-full overflow-y-auto"
        ref={scrollRef}
        onWheel={disableAutoScroll}
        onTouchMove={disableAutoScroll}
      >
        <div className={`flex flex-col w-full min-h-full px-6 py-8`}>
          <div className="flex flex-col gap-4 flex-1">{children}</div>
        </div>
      </div>

      {!isAtBottom && (
        <Button
          onClick={() => {
            scrollToBottom()
          }}
          size="icon"
          variant="outline"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg border-border/50 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

ChatMessageList.displayName = 'ChatMessageList'
