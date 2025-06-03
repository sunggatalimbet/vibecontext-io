/**
 * @file: UserMenu.tsx
 * @description: User menu component with avatar, profile info, and authentication actions
 * @dependencies: React, @repo/auth, shadcn/ui components
 * @created: 2024-12-19
 */

'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@repo/auth/react'
import { LogOut, User, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const UserMenu = () => {
  const { user, signOut, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-8 rounded-full bg-muted"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <Button onClick={() => router.push('/auth/login')} variant="outline">
        Sign In
      </Button>
    )
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const userInitials = (() => {
    const fullName = user.user_metadata?.full_name as string | undefined
    if (fullName && typeof fullName === 'string') {
      return fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
    }
    return user.email?.charAt(0).toUpperCase() || 'U'
  })()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.user_metadata?.avatar_url as string | undefined}
              alt="User avatar"
            />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {(user.user_metadata?.full_name as string) || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push('/profile')}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push('/settings')}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
