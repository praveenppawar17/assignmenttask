import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd"
import type { TASK_STATUS, TASK_PRIORITY } from "../constants"

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]
export type TaskPriority = (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY]

export type TaskBase = {
  projectId: string
  title: string
  description?: string
  status: TaskStatus
  priority?: TaskPriority
  dueDate?: string
}

export type Task = TaskBase & {
  _id: string
  createdAt: string
  updatedAt: string
}

export type CreateTaskInput = TaskBase

export type UpdateTaskInput = Partial<TaskBase>

export type TaskFilters = {
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
}

export type TaskFilterForm = {
  status: TaskStatus | ""
  priority: TaskPriority | ""
  dueDate: string
}

export type TaskFormState = {
  projectId: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority | ""
  dueDate: string
}

export type TaskCardProps = {
  task: Task
  onEdit: (task: Task) => void
  dragHandleProps?: DraggableProvidedDragHandleProps | null
}

export type TaskModalProps = {
  projectId: string
  task?: Task | null
  onClose: () => void
}

export type TaskState = {
  tasks: Task[]
  loading: boolean
  error: string | null
}
