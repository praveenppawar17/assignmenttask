import type { DashboardStatsProps } from "../../types/dashboard.types"

export default function DashboardStats({ projectCount, totalTasks, completedTasks }: DashboardStatsProps) {
  const stats = [
    { label: "Total Projects", value: projectCount },
    { label: "Total Tasks", value: totalTasks },
    { label: "Completed", value: completedTasks },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map(stat => (
        <div key={stat.label} className="card p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {stat.label}
          </p>

          <p className="text-3xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
