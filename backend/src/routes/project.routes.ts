import express from "express";
import { protect } from "../middleware/auth.middleware";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller";
import { validate } from "../middleware/validation.middleware";
import {
  createProjectSchema,
  deleteProjectSchema,
  updateProjectSchema,
} from "../validations/project.validation";

const router = express.Router();

router.post("/", protect, validate(createProjectSchema), createProject);
router.get("/", protect, getProjects);
router.put("/:id", protect, validate(updateProjectSchema), updateProject);
router.delete("/:id", protect, validate(deleteProjectSchema), deleteProject);

export default router;
