import { TASK_PRIORITY, TASK_STATUS } from "../constants"
import type { TaskPriority, TaskStatus } from "../types/task.types"

const STATUSES: TaskStatus[] = Object.values(TASK_STATUS)

type Filters = {
  status: TaskStatus | ""
  priority: TaskPriority | ""
  dueDate: string
}

type ProjectFiltersProps = {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  applyFilters: () => void
  handleClearFilters: () => void
  hasFilters: boolean
  taskCount: number
}

export default function ProjectFilters({
  filters,
  setFilters,
  applyFilters,
  handleClearFilters,
  hasFilters,
  taskCount,
}: ProjectFiltersProps) {
  return (
    <div className="card px-3 md:px-4 py-3 mb-6 flex items-center gap-2 md:gap-3 flex-wrap">
      <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
        Filters
      </span>

      <select
        className="input py-1.5! px-3! text-xs w-36"
        value={filters.status}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            status: e.target.value as TaskStatus | "",
          }))
        }
      >
        <option value="">All Statuses</option>

        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select
        className="input py-1.5! px-3! text-xs w-36"
        value={filters.priority}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            priority: e.target.value as TaskPriority | "",
          }))
        }
      >
        <option value="">All Priorities</option>

        {Object.values(TASK_PRIORITY).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="input py-1.5! px-3! text-xs w-40"
        value={filters.dueDate}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            dueDate: e.target.value,
          }))
        }
      />

      <button
        onClick={applyFilters}
        className="btn-primary py-1.5! px-3! text-xs"
      >
        Apply
      </button>

      {hasFilters && (
        <button
          onClick={handleClearFilters}
          className="btn-ghost py-1.5! px-3! text-xs text-gray-500"
        >
          Clear
        </button>
      )}

      <span className="ml-auto text-xs text-gray-600 font-mono">
        {taskCount} task{taskCount !== 1 ? "s" : ""}
      </span>
    </div>
  )
}