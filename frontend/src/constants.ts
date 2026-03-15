import type { TaskStatus } from "./types/task.types";

export const TASK_STATUS = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
} as const;

export const TASK_PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export const columnStyleConstant: Record<
  TaskStatus,
  { header: string; dot: string; count: string }
> = {
  Todo: {
    header: "text-gray-400",
    dot: "bg-gray-500",
    count: "bg-surface-3 text-gray-400",
  },
  "In Progress": {
    header: "text-blue-400",
    dot: "bg-blue-400",
    count: "bg-blue-500/20 text-blue-400",
  },
  Completed: {
    header: "text-green-400",
    dot: "bg-green-400",
    count: "bg-green-500/20 text-green-400",
  },
};
