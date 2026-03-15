import Project from "../models/project.model";
import Task from "../models/task.model";
import { TASK_STATUS } from "../constants";

export const getDashboardStatsService = async (userId: string) => {
  const projects = await Project.find({ userId }).select("_id");

  const projectIds = projects.map((p) => p._id);

  const projectCount = projectIds.length;

  const totalTasks = await Task.countDocuments({
    projectId: { $in: projectIds },
  });

  const completedTasks = await Task.countDocuments({
    projectId: { $in: projectIds },
    status: TASK_STATUS.COMPLETED,
  });

  return {
    projectCount,
    totalTasks,
    completedTasks,
  };
};
