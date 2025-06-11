'use client'

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatMessageList,
  MemoizedChatBubble,
} from '@/components/chat'
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area'
import { ProjectComplete } from './project-complete'
import { useProject } from './project-provider'

export const ProjectMessages = () => {
  const { messages, isProjectCompleted } = useProject()
  if (messages.length === 0) return null

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full overflow-hidden">
        <ChatMessageList smooth>
          {messages.map(message => (
            <ChatBubble
              key={message.id}
              variant={message.role === 'user' ? 'sent' : 'received'}
            >
              {message.role !== 'user' && (
                <ChatBubbleAvatar className="shrink-0" fallback="AI" />
              )}
              <ChatBubbleMessage
                variant={message.role === 'user' ? 'sent' : 'received'}
              >
                <MemoizedChatBubble message={message} />
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isProjectCompleted && <ProjectComplete />}
        </ChatMessageList>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
