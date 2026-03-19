// project.types.ts

export type Project = {
  _id: string;
  projectName: string;
  description?: string;
  taskCount?: number;
  createdAt?: string;
};

export type CreateProjectInput = {
  projectName: string;
  description?: string;
};

export type UpdateProjectInput = {
  projectName?: string;
  description?: string;
};

export type ProjectCardProps = {
  project: Project
  onClick: () => void
  onDelete: (e: React.MouseEvent, id: string) => void
  onEdit: (e: React.MouseEvent, project: Project) => void
}
export type ProjectState = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

export type ProjectModalProps = {
  onClose: () => void;
  project?: Project | null;
};

export type UserProjectsProps = {
  projects: Project[]
  onProjectClick: (id: string) => void
  onDelete: (e: React.MouseEvent, id: string) => void
  onEdit: (e: React.MouseEvent, project: Project) => void
}

