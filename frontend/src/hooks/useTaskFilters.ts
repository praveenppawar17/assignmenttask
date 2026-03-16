import { useState } from "react"
import type { TaskFilters, TaskFilterForm } from "../types/task.types"

export function useTaskFilters() {
  const [filters, setFilters] = useState<TaskFilterForm>({
    status: "",
    priority: "",
    dueDate: "",
  })

  const apiFilters: TaskFilters = {
    status: filters.status || undefined,
    priority: filters.priority || undefined,
    dueDate: filters.dueDate || undefined,
  }

  const clearFilters = () => {
    setFilters({
      status: "",
      priority: "",
      dueDate: "",
    })
  }

  const hasFilters =
    filters.status !== "" ||
    filters.priority !== "" ||
    filters.dueDate !== ""

  return {
    filters,
    setFilters,
    apiFilters,
    clearFilters,
    hasFilters,
  }
}
