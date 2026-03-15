import { Request, Response } from "express";
import {
  createProjectService,
  getProjectsService,
  updateProjectService,
  deleteProjectService,
} from "../services/project.service";
import { CreateProjectBody, UpdateProjectBody } from "../types/project.types";
import { sendResponse } from "../utils/apiResponse";

// create Project
export const createProject = async (
  req: Request<{}, {}, CreateProjectBody>,
  res: Response,
) => {
  try {
    const project = await createProjectService(req.body, req.user!.id);
    return sendResponse(res, 201, project, "Project created successfully");
  } catch (error) {
    if (error instanceof Error) {
      return sendResponse(res, 500, undefined, error.message);
    }
  }
};

// Get Projecst
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await getProjectsService(req.user!.id);
    const message =
      projects.length === 0
        ? "No projects found"
        : "Projects fetched successfully";
    return sendResponse(res, 200, projects, message);
  } catch (error) {
    if (error instanceof Error) {
      return sendResponse(res, 500, undefined, error.message);
    }
  }
};

// Update Project
export const updateProject = async (
  req: Request<{ id: string }, {}, UpdateProjectBody>,
  res: Response,
) => {
  try {
    const project = await updateProjectService(
      req.params.id,
      req.user!.id,
      req.body,
    );
    return sendResponse(res, 200, project, "Project updated successfully");
  } catch (error) {
    if (error instanceof Error) {
      return sendResponse(res, 500, undefined, error.message);
    }
  }
};

// Delete Project
export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const result = await deleteProjectService(req.params.id, req.user!.id);
    return sendResponse(res, 200, result, "Project deleted successfully");
  } catch (error) {
    if (error instanceof Error) {
      return sendResponse(res, 500, undefined, error.message);
    }
  }
};
