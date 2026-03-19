import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../hooks/redux";
import { createTask, updateTask } from "../features/tasks/taskSlice";
import type {
  TaskStatus,
  TaskPriority,
  TaskModalProps,
  TaskFormState,
} from "../types/task.types";
import { TASK_PRIORITY, TASK_STATUS } from "../constants";

export default function TaskModal({
  projectId,
  task,
  onClose,
}: TaskModalProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<TaskFormState>({
    projectId,
    title: "",
    description: "",
    status: TASK_STATUS.TODO,
    priority: "" as TaskPriority | "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (task) {
      setForm({
        projectId,
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority || "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [task]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Task title is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      if (task) {
        // Update
        await dispatch(
          updateTask({
            id: task._id,
            data: {
              title: form.title,
              description: form.description,
              status: form.status,
              priority: form.priority || undefined,
              dueDate: form.dueDate || undefined,
            },
          }),
        ).unwrap();
        toast.success("Task updated");
      } else {
        // Create
        console.log("form.... ", form);
        await dispatch(
          createTask({
            projectId, // required in payload
            title: form.title,
            description: form.description,
            status: form.status,
            priority: form.priority || undefined,
            dueDate: form.dueDate || undefined,
          }),
        ).unwrap();
        toast.success("Task created");
      }
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="card w-full max-w-md p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-white text-lg">
            {task ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input
              className={`input ${errors.title ? "border-red-500" : ""}`}
              placeholder="Task title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              className="input resize-none"
              rows={3}
              placeholder="Task details"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Status</label>
              <select
                className="input"
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    status: e.target.value as TaskStatus,
                  }))
                }
              >
                {Object.values(TASK_STATUS).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Priority</label>
              <select
                className="input"
                value={form.priority}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    priority: e.target.value as TaskPriority | "",
                  }))
                }
              >
                <option value="">None</option>
                {Object.values(TASK_PRIORITY).map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Due Date</label>
            <input
              type="date"
              className="input"
              value={form.dueDate}
              min={today}
              onChange={(e) =>
                setForm((f) => ({ ...f, dueDate: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-ghost flex-1">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary flex-1"
          >
            {task ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
