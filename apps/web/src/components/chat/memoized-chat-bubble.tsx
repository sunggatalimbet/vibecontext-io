import { memo, useMemo } from 'react'
import { type UIMessage } from 'ai'
import { marked } from 'marked'
import ReactMarkdown from 'react-markdown'

function parseMarkdownIntoBlocks(markdown: string): Array<string> {
  const tokens = marked.lexer(markdown)
  return tokens.map(token => token.raw)
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return <ReactMarkdown>{content}</ReactMarkdown>
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
      />
    ))
  }
)

MemoizedChatBubble.displayName = 'MemoizedChatBubble'
