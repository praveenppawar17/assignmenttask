import { useNavigate } from "react-router-dom"

interface ProjectHeaderProps {
  projectName?: string
  description?: string
  onAddTask: () => void
}

export default function ProjectHeader({
  projectName,
  description,
  onAddTask,
}: ProjectHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={() => navigate("/")}
        className="text-gray-500 hover:text-white transition-colors"
      >
        &#8592;
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="font-display text-lg md:text-2xl font-bold text-white truncate">
          {projectName || "Project"}
        </h1>

        {description && (
          <p className="text-gray-500 text-sm mt-0.5 truncate">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={onAddTask}
        className="btn-primary flex items-center gap-2 shrink-0"
      >
        + Add Task
      </button>
    </div>
  )
}