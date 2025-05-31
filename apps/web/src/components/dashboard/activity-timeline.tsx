'use client'

import {
  MessageSquareIcon,
  FileTextIcon,
  ImageIcon,
  CheckCircleIcon,
  UserPlusIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

const activities = [
  {
    id: 1,
    user: {
      name: 'Emma Wilson',
      avatar:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      initials: 'EW',
    },
    action: 'commented on',
    target: 'iOS App Design',
    time: '2 hours ago',
    icon: <MessageSquareIcon className="h-4 w-4" />,
    iconClass: 'bg-blue-500/20 text-blue-500',
  },
  {
    id: 2,
    user: {
      name: 'Michael Davis',
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      initials: 'MD',
    },
    action: 'uploaded',
    target: 'Project Documentation',
    time: '5 hours ago',
    icon: <FileTextIcon className="h-4 w-4" />,
    iconClass: 'bg-purple-500/20 text-purple-500',
  },
  {
    id: 3,
    user: {
      name: 'Jessica Taylor',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      initials: 'JT',
    },
    action: 'added new',
    target: 'Product Mockups',
    time: 'Yesterday',
    icon: <ImageIcon className="h-4 w-4" />,
    iconClass: 'bg-green-500/20 text-green-500',
  },
  {
    id: 4,
    user: {
      name: 'Alex Johnson',
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      initials: 'AJ',
    },
    action: 'completed',
    target: 'Frontend Implementation',
    time: '2 days ago',
    icon: <CheckCircleIcon className="h-4 w-4" />,
    iconClass: 'bg-amber-500/20 text-amber-500',
  },
  {
    id: 5,
    user: {
      name: 'Sarah Miller',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      initials: 'SM',
    },
    action: 'invited',
    target: 'New Team Members',
    time: '3 days ago',
    icon: <UserPlusIcon className="h-4 w-4" />,
    iconClass: 'bg-pink-500/20 text-pink-500',
  },
]

export function ActivityTimeline() {
  return (
    <div className="space-y-4 p-1">
      {activities.map((activity, index) => (
        <div key={activity.id}>
          <div className="flex items-start gap-4">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{' '}
                  <span className="text-muted-foreground">
                    {activity.action}
                  </span>{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <div
                  className={`ml-auto rounded-full p-1 ${activity.iconClass}`}
                >
                  {activity.icon}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
          {index < activities.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}
