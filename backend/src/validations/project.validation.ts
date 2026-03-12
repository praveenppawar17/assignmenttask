import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    projectName: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters"),

    description: z.string().trim().optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    projectName: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters"),

    description: z.string().trim().optional(),
  }),

  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid project id"),
  }),
});

export const deleteProjectSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid project id"),
  }),
});
