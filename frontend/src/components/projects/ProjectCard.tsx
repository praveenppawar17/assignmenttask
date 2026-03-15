import type { ProjectCardProps } from "../../types/project.types"

export default function ProjectCard({ project, onClick, onDelete, onEdit }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="card p-5 cursor-pointer hover:border-accent/40 hover:bg-surface-2/50 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          📁
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={e => onEdit(e, project)}
            className="p-1 text-gray-500 hover:text-white"
          >
            ✏️
          </button>

          <button
            onClick={e => onDelete(e, project._id)}
            className="p-1 text-gray-500 hover:text-red-400"
          >
            🗑
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-white mb-1 truncate">
        {project.projectName}
      </h3>

      <p className="text-gray-500 text-sm mb-4">
        {project.description || "No description"}
      </p>

      <div className="flex justify-between text-xs text-gray-400">
        <span>
          {new Date(project.createdAt!).toLocaleDateString("en-GB")}
        </span>
      </div>
    </div>
  )
}

