'use client'

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useContext,
} from 'react'
import { usePathname } from 'next/navigation'
import { type Project } from '@repo/db'

interface SidebarContextValue {
  projects: Array<Project> | null
  setProjects: Dispatch<SetStateAction<Array<Project> | null>>
  currentPath: string
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

interface SidebarProviderProps {
  children: React.ReactNode
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [projects, setProjects] = useState<Array<Project> | null>(null)
  const currentPath = usePathname()

  const value = {
    projects,
    setProjects,
    currentPath,
  }

  return <SidebarContext value={value}>{children}</SidebarContext>
}

export const useSidebar = (): SidebarContextValue => {
  const context = useContext(SidebarContext)
  if (context === null) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}
