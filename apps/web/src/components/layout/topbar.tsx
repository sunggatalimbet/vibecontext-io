'use client'

import { useState, useEffect } from 'react'
import { UserMenu } from '@/components/auth/UserMenu'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export function Topbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-[60px] w-full items-center border-b backdrop-blur-lg transition-all duration-200',
        scrolled
          ? 'border-border bg-background/70'
          : 'border-transparent bg-transparent'
      )}
    >
      <div className="flex w-full justify-between items-center gap-6 px-6">
        <div className="flex w-full items-center gap-6 min-w-0">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="w-full bg-muted/50 h-full grid grid-cols-3">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="features">Features tree</TabsTrigger>
              <TabsTrigger value="practices">Best practices</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="shrink-0">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
