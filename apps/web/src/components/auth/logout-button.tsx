'use client'

import { useTransition } from 'react'
import { LogOutIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

interface LogoutButtonProps {
  logoutAction: () => Promise<void>
}

export function LogoutButton({ logoutAction }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logoutAction()
      } catch (err) {
        console.error('Logout error:', err)
      }
    })
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      className="w-full flex items-center text-left cursor-pointer px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      {isPending ? 'Signing out...' : 'Sign Out'}
    </Button>
  )
}
