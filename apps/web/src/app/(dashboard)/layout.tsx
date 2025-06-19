/**
 * @file: layout.tsx
 * @description: Layout for authenticated dashboard pages
 * @dependencies: DashboardLayout component
 * @created: 2025-01-07
 */

import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
