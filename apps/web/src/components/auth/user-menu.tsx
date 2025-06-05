/**
 * @file: UserMenu.tsx
 * @description: Server component for user menu with avatar, profile info, and sign out
 */

import Link from 'next/link'
import { getUserAction, signOutAction } from '@repo/auth'
import { UserIcon, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getUserInitials } from '@/lib'
import { LogoutButton } from './logout-button'

export const UserMenu = async () => {
  const user = await getUserAction()
  if (!user) return null

  const fullName = user.user_metadata?.full_name as string | undefined
  const userInitials = getUserInitials({
    fullName: fullName,
    email: user.email,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.user_metadata?.avatar_url as string} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="text-sm font-medium">{fullName || 'User'}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/profile">
            <UserIcon className="mr-2 h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" asChild>
          <LogoutButton logoutAction={signOutAction} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
