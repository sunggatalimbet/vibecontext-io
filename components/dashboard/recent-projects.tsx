'use client'

import { MoreHorizontalIcon, StarIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

const projects = [
  {
    id: 1,
    name: 'iOS App Redesign',
    description: 'User interface overhaul for mobile application',
    progress: 80,
    status: 'In Progress',
    statusColor: 'bg-amber-500/20 text-amber-500',
    teamMembers: [
      {
        id: 1,
        name: 'Emma W',
        avatar:
          'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
        initials: 'EW',
      },
      {
        id: 2,
        name: 'Alex J',
        avatar:
          'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        initials: 'AJ',
      },
      {
        id: 3,
        name: 'Michael D',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        initials: 'MD',
      },
    ],
    starred: true,
  },
  {
    id: 2,
    name: 'Dashboard Analytics',
    description: 'Data visualization for client dashboard',
    progress: 45,
    status: 'In Progress',
    statusColor: 'bg-amber-500/20 text-amber-500',
    teamMembers: [
      {
        id: 4,
        name: 'Jessica T',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        initials: 'JT',
      },
      {
        id: 1,
        name: 'Emma W',
        avatar:
          'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
        initials: 'EW',
      },
    ],
    starred: false,
  },
  {
    id: 3,
    name: 'E-commerce Platform',
    description: 'Online store with integrated payment system',
    progress: 92,
    status: 'Review',
    statusColor: 'bg-blue-500/20 text-blue-500',
    teamMembers: [
      {
        id: 3,
        name: 'Michael D',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        initials: 'MD',
      },
      {
        id: 5,
        name: 'Sarah M',
        avatar:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        initials: 'SM',
      },
      {
        id: 2,
        name: 'Alex J',
        avatar:
          'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        initials: 'AJ',
      },
    ],
    starred: true,
  },
  {
    id: 4,
    name: 'Brand Guidelines',
    description: 'Design system and style guide for client',
    progress: 100,
    status: 'Completed',
    statusColor: 'bg-green-500/20 text-green-500',
    teamMembers: [
      {
        id: 5,
        name: 'Sarah M',
        avatar:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        initials: 'SM',
      },
      {
        id: 4,
        name: 'Jessica T',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        initials: 'JT',
      },
    ],
    starred: false,
  },
  {
    id: 5,
    name: 'Marketing Website',
    description: 'Corporate site with blog and resources',
    progress: 65,
    status: 'In Progress',
    statusColor: 'bg-amber-500/20 text-amber-500',
    teamMembers: [
      {
        id: 1,
        name: 'Emma W',
        avatar:
          'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
        initials: 'EW',
      },
      {
        id: 3,
        name: 'Michael D',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        initials: 'MD',
      },
      {
        id: 5,
        name: 'Sarah M',
        avatar:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        initials: 'SM',
      },
    ],
    starred: true,
  },
]

export function RecentProjects() {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div key={project.id}>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{project.name}</h3>
                {project.starred && (
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                )}
                <Badge
                  variant="outline"
                  className={`ml-auto ${project.statusColor}`}
                >
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {project.description}
              </p>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1.5" />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.teamMembers.map(member => (
                    <Avatar
                      key={member.id}
                      className="h-7 w-7 border-2 border-background hover:translate-y-[-2px] transition-transform"
                    >
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="text-xs">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.teamMembers.length > 3 && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                      +{project.teamMembers.length - 3}
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground"
                >
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {index < projects.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}
