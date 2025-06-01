'use client'

import { useState, SyntheticEvent } from 'react'
import { ArrowUp } from 'lucide-react'
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@/components/chat/chat-bubble'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessageList } from '@/components/chat/chat-message-list'
import { Button } from '@/components/ui/button'
import AnimatedBulbLogo from '../components/shared/animated-bulb-logo'
import { ScrollArea, ScrollBar } from '../components/ui/scroll-area'

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{ id: number; content: string; sender: 'user' | 'ai' }>
  >([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: 'user',
      },
    ])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          content:
            'I understand you want to build an app. Could you tell me more about your specific requirements and goals?',
          sender: 'ai',
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col justify-between h-full w-full max-w-none mx-auto">
      {/* Welcome Section - Hidden when messages exist */}
      <div
        className={`flex-shrink-0 text-center transition-all duration-500 ease-in-out ${
          messages.length > 0
            ? 'opacity-0 -translate-y-4 h-0 overflow-hidden'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex justify-center w-96 h-96 mx-auto">
          <AnimatedBulbLogo size={384} />
        </div>
        <h1 className="text-4xl font-bold font-satoshi italic tracking-tight mb-4">
          Welcome to vibecontext.io
        </h1>
        <p className="text-lg text-muted-foreground font-satoshi italic">
          type idea → get your docs → start shipping
        </p>
      </div>

      {/* Chat Messages Area - Scrollable */}
      <ScrollArea className="flex-1 overflow-hidden max-h-[72vh]">
        <ChatMessageList smooth>
          {messages.map(message => (
            <ChatBubble
              key={message.id}
              variant={message.sender === 'user' ? 'sent' : 'received'}
            >
              {message.sender === 'ai' && (
                <ChatBubbleAvatar className="shrink-0" fallback="AI" />
              )}
              <ChatBubbleMessage
                variant={message.sender === 'user' ? 'sent' : 'received'}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar className="shrink-0" fallback="AI" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {/* Fixed Input Area */}
      <div className="flex-shrink-0 border-t bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center pl-2 pr-4 border rounded-lg shadow-lg bg-background">
            <ChatInput
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              placeholder="Type your message here..."
              className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 resize-none min-h-[auto]"
            />
            <Button
              type="submit"
              size="icon"
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="rounded-md flex-shrink-0 w-10 h-10"
            >
              <ArrowUp className="w-5 h-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
