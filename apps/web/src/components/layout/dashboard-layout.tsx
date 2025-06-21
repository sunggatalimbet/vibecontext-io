import { Topbar } from '@/components/layout/topbar'
import { Sidebar } from '@/entities/sidebar/ui'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto max-h-[calc(100vh-60px)]">
          {children}
        </main>
      </div>
    </div>
  )
}
