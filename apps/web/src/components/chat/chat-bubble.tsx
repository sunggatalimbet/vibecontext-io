'use client'

import type * as React from 'react'
import { cva } from 'class-variance-authority'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageLoading } from '@/components/ui/message-loading'
import { cn } from '@/lib/utils'

interface ChatBubbleProps {
  variant?: 'sent' | 'received'
  layout?: 'default' | 'ai'
  className?: string
  children: React.ReactNode
}

// ChatBubble
const _chatBubbleVariant = cva(
  'flex gap-2 max-w-[60%] items-end relative group',
  {
    variants: {
      variant: {
        received: 'self-start',
        sent: 'self-end flex-row-reverse',
      },
      _layout: {
        default: '',
        ai: 'max-w-full w-full',
      },
    },
    defaultVariants: {
      variant: 'received',
      _layout: 'default',
    },
  }
)

export function ChatBubble({
  variant = 'received',
  layout: _layout = 'default',
  className,
  children,
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 mb-6 w-full',
        variant === 'sent' && 'flex-row-reverse justify-start',
        variant === 'received' && 'justify-start',
        className
      )}
    >
      {children}
    </div>
  )
}

interface ChatBubbleMessageProps {
  variant?: 'sent' | 'received'
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

export function ChatBubbleMessage({
  variant = 'received',
  isLoading,
  className,
  children,
}: ChatBubbleMessageProps) {
  return (
    <div
      className={cn(
        'rounded-xl px-4 py-3 max-w-[70%] text-sm leading-relaxed',
        variant === 'sent'
          ? 'bg-primary text-primary-foreground ml-auto'
          : 'bg-muted text-muted-foreground mr-auto',
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  )
}

interface ChatBubbleAvatarProps {
  src?: string
  fallback?: string
  className?: string
}

export function ChatBubbleAvatar({
  src,
  fallback = 'AI',
  className,
}: ChatBubbleAvatarProps) {
  return (
    <Avatar className={cn('h-8 w-8 shrink-0', className)}>
      {src && <AvatarImage src={src} />}
      <AvatarFallback className="text-xs font-medium">
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}

interface ChatBubbleActionProps {
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ChatBubbleAction({
  icon,
  onClick,
  className,
}: ChatBubbleActionProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('h-6 w-6', className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  )
}

export function ChatBubbleActionWrapper({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('flex items-center gap-1 mt-2', className)}>
      {children}
    </div>
  )
}
