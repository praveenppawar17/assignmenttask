import Project from "../models/project.model";
import { CreateProjectBody, UpdateProjectBody } from "../types/project.types";

export const createProjectService = async (
  data: CreateProjectBody,
  userId: string,
) => {
  const project = await Project.create({
    ...data,
    userId,
  });

  return project;
};

export const getProjectsService = async (userId: string) => {
  const projects = await Project.find({ userId });

  return projects;
};

export const updateProjectService = async (
  projectId: string,
  userId: string,
  data: UpdateProjectBody,
) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId },
    { $set: data },
    { new: true },
  );

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  return project;
};

export const deleteProjectService = async (
  projectId: string,
  userId: string,
) => {
  const project = await Project.findOneAndDelete({
    _id: projectId,
    userId,
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  return { message: "Project deleted successfully" };
};
