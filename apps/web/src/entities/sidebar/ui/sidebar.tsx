/**
 * @file: sidebar.tsx
 * @description: Dashboard sidebar layout
 * @dependencies: Sidebar wrapper component that handles current path detection
 * @created: 2025-01-07
 */

import { SidebarContent } from './sidebar-content'
import { SidebarMobileSheet } from './sidebar-mobile-sheet'
import { SidebarProvider } from './sidebar-provider'

export function Sidebar() {
  return (
    <SidebarProvider>
      <div className="hidden md:flex h-screen w-[240px] flex-col border-r border-border bg-background">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <SidebarMobileSheet />
    </SidebarProvider>
  )
}
