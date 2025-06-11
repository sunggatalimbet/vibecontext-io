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
        // Set height based on scroll height, but constrained by max height
        const newHeight = Math.min(textarea.scrollHeight, 128) // 240px = max-h-60
        textarea.style.height = `${newHeight}px`
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
      <ScrollArea className="w-full h-full max-h-32 mr-2">
        <div className="h-full">
          <Textarea
            autoComplete="off"
            ref={textareaRef}
            name="message"
            value={value}
            onChange={handleChange}
            className={cn(
              'min-h-12 px-4 py-3 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed resize-none w-full leading-relaxed',
              className
            )}
            {...props}
          />
        </div>
        <ScrollBar orientation="vertical" className="opacity-100" />
      </ScrollArea>
    )
  }
)
ChatInput.displayName = 'ChatInput'

export { ChatInput }
