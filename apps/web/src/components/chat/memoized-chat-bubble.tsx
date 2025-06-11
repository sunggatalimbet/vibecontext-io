import { memo, useMemo } from 'react'
import { type UIMessage } from 'ai'
import { marked } from 'marked'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/shared/lib/utils'

function parseMarkdownIntoBlocks(markdown: string): Array<string> {
  const tokens = marked.lexer(markdown)
  return tokens.map(token => token.raw)
}

const MemoizedMarkdownBlock = memo(
  ({ content, className }: { content: string; className: string }) => {
    const markdownBlockClassName = cn(
      'prose prose-sm dark:prose-invert max-w-none',
      '[&_*]:text-inherit',
      className
    )

    return (
      <div className={markdownBlockClassName}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false
    return true
  }
)

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock'

export const MemoizedChatBubble = memo(
  ({ message }: { message: UIMessage }) => {
    const mdBlocks = useMemo(
      () => parseMarkdownIntoBlocks(message.content),
      [message.content]
    )

    return mdBlocks.map((block, index) => (
      <MemoizedMarkdownBlock
        content={block}
        key={`${message.id}-block_${index}`}
        className={
          message.role === 'user'
            ? 'text-primary-foreground'
            : 'text-muted-foreground'
        }
      />
    ))
  }
)

MemoizedChatBubble.displayName = 'MemoizedChatBubble'
