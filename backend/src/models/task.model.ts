import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { TaskPriority, TaskStatus } from "../types/task.types";
import { TASK_PRIORITY, TASK_STATUS } from "../constants";
import { IProject } from "./project.model";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  projectId:PopulatedDoc<IProject>
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.TODO,
    },

    priority: {
      type: String,
      enum: Object.values(TASK_PRIORITY),
      default: TASK_PRIORITY.MEDIUM,
    },

    dueDate: Date,

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ITask>("Task", taskSchema);
