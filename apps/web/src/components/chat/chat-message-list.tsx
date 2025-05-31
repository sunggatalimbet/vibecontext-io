import * as React from 'react'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAutoScroll } from '@/hooks/use-auto-scroll'
import { cn } from '@/lib/utils'

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  smooth?: boolean
}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, smooth = false, ...props }, _ref) => {
    const {
      scrollRef,
      isAtBottom,
      autoScrollEnabled,
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
          {...props}
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
)

ChatMessageList.displayName = 'ChatMessageList'

export { ChatMessageList }
