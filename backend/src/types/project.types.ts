export type CreateProjectBody = {
  projectName: string;
  description?: string;
};

export type UpdateProjectBody = {
  projectName?: string;
  description?: string;
};
