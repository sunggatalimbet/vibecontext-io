import * as React from 'react'
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area'
import { Textarea } from '@/shared/components/ui/textarea'
import { cn } from '@/shared/lib/utils'

interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || internalRef

    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current
      if (textarea) {
        // Reset height to allow shrinking
        textarea.style.height = 'auto'
        // Set height based on scroll height, constrained by CSS min/max
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [textareaRef])

    React.useEffect(() => {
      adjustHeight()
    }, [value, adjustHeight])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e)
      // Adjust height after state update
      setTimeout(adjustHeight, 0)
    }

    return (
      <ScrollArea className="w-full h-32 mr-2">
        <Textarea
          autoComplete="off"
          ref={textareaRef}
          name="message"
          value={value}
          onChange={handleChange}
          className={cn(
            'min-h-12 max-h-60 px-4 py-3 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed resize-none w-full leading-relaxed overflow-y-hidden',
            className
          )}
          {...props}
        />
        <ScrollBar />
      </ScrollArea>
    )
  }
)
ChatInput.displayName = 'ChatInput'

export { ChatInput }
