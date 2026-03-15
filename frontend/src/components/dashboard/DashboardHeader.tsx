import type { DashboardHeaderProps } from "../../types/dashboard.types";


export default function DashboardHeader({ name, onCreate }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
          Hey, {name?.split(" ")[0]} 👋
        </h1>

        <p className="text-gray-500 mt-1">
          Here's what's happening with your projects.
        </p>
      </div>

      <button onClick={onCreate} className="btn-primary">
        New Project
      </button>
    </div>
  )
}
