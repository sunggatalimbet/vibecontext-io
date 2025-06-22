'use client'

import { use, useOptimistic, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type ConversationOmitUserId } from '@repo/db'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { deleteConversationAction } from '@/lib/actions'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'
import { AsyncButtonContent } from '../../../shared/components/async-button-content'
import { useSidebar } from './sidebar-provider'

interface SidebarConversationsAccordionContentProps {
  conversationsPromise: Promise<Array<ConversationOmitUserId>>
}

export const SidebarConversationsAccordionContent = ({
  conversationsPromise,
}: SidebarConversationsAccordionContentProps) => {
  const router = useRouter()
  const conversations = use(conversationsPromise)
  const { currentPath } = useSidebar()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [optimisticConversations, removeOptimisticConversation] = useOptimistic(
    conversations,
    (state: Array<ConversationOmitUserId>, conversationIdToRemove: string) =>
      state.filter(conversation => conversation.id !== conversationIdToRemove)
  )

  const handleDeleteConversation = (
    conversationId: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault()
    e.stopPropagation()

    startTransition(async () => {
      removeOptimisticConversation(conversationId)
      try {
        const deletedConversationData =
          await deleteConversationAction(conversationId)

        if (!deletedConversationData.success) {
          toast.error(`Failed to delete conversation. Try again.`)
          return
        }

        const deletedConversation = deletedConversationData.data
        toast.success(deletedConversation.message)
        setIsDialogOpen(prevIsDialogOpen => !prevIsDialogOpen)

        if (currentPath === `/conversations/${conversationId}`) {
          router.push('/dashboard')
        } else {
          router.refresh()
        }
      } catch (error) {
        console.error(error)
        toast.error('Failed to delete conversation. Please try again.')
      }
    })
  }

  return (
    <>
      {optimisticConversations.map(conversation => {
        const projectPath = `/conversations/${conversation.id}`
        const isActive = currentPath === projectPath

        return (
          <div
            key={conversation.id}
            className={cn(
              'group relative w-full h-9 rounded-md',
              isActive ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent/50'
            )}
          >
            <Link
              href={projectPath}
              className={cn(
                'flex items-center w-full h-full px-2 rounded-md',
                isActive
                  ? 'text-sidebar-primary font-medium'
                  : 'text-muted-foreground hover:text-sidebar-primary'
              )}
            >
              <span className="text-sm ml-2 truncate pr-8">
                {conversation.title}
              </span>
            </Link>

            {/* Delete button - only visible on hover */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  )}
                >
                  <TrashIcon size={14} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete conversation</DialogTitle>
                  <DialogDescription>
                    Are you sure that you want to delete the conversation &quot;
                    {conversation.title}&quot;?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">No, cancel</Button>
                  </DialogClose>

                  <Button
                    onClick={e => handleDeleteConversation(conversation.id, e)}
                  >
                    <AsyncButtonContent
                      isLoading={isPending}
                      loadingText={'Deleting...'}
                    >
                      Yes, delete
                    </AsyncButtonContent>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )
      })}
    </>
  )
}
