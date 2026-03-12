import express from "express";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../validations/task.validation";
import {
  createTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import { validate } from "../middleware/validation.middleware";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, validate(createTaskSchema), createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, validate(updateTaskSchema), updateTask);

export default router;
