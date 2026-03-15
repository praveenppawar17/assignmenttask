import type { UserProjectsProps } from "../../types/project.types"
import ProjectCard from "./ProjectCard"

export default function UserProjects({
  projects,
  onProjectClick,
  onDelete,
  onEdit,
}: UserProjectsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map(project => (
        <ProjectCard
          key={project._id}
          project={project}
          onClick={() => onProjectClick(project._id)}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
