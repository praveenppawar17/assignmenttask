export type DashboardStatsProps = {
  projectCount: number
  totalTasks: number
  completedTasks:number
}

export type DashboardHeaderProps = {
  name?: string
  onCreate: () => void
}