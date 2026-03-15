import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  CreateTaskInput,
  Task,
  TaskFilters,
  TaskState,
} from "../../types/task.types";
import { fetchTasksApi, createTaskApi, updateTaskApi } from "../../api/taskApi";

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// taskSlice.ts
export const fetchTasks = createAsyncThunk<
  Task[],
  { projectId: string; filters?: TaskFilters }
>("tasks/fetchTasks", async ({ projectId, filters }) => {
  return await fetchTasksApi(projectId, filters); // no .data needed
});

export const createTask = createAsyncThunk<Task, CreateTaskInput>(
  "tasks/createTask",
  async (data) => {
    return await createTaskApi(data); // returns Task
  },
);

export const updateTask = createAsyncThunk<
  Task,
  { id: string; data: Partial<Task> }
>("tasks/updateTask", async ({ id, data }) => {
  return await updateTaskApi(id, data); // returns Task
});

// Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // ✅ Reorder tasks locally
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchTasks.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchTasks.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.tasks = action.payload;
      // })
      // .addCase(fetchTasks.rejected, (state) => {
      //   state.loading = false;
      // })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((t) =>
          t._id === action.payload._id ? action.payload : t,
        );
      });
  },
});

// ✅ Export the action
export const { reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;

// export const fetchTasks = createAsyncThunk<
//   Task[],
//   { projectId: string; filters?: TaskFilters }
// >("tasks/fetchTasks", async ({ projectId, filters }) => {
//   const res = await fetchTasksApi(projectId, filters);
//   return res.data;
// });

// export const createTask = createAsyncThunk<Task, CreateTaskInput>(
//   "tasks/createTask",
//   async (data) => {
//     const res = await createTaskApi(data);
//     return res.data;
//   },
// );

// export const updateTask = createAsyncThunk<
//   Task,
//   { id: string; data: Partial<Task> }
// >("tasks/updateTask", async ({ id, data }) => {
//   const res = await updateTaskApi(id, data);
//   return res.data;
// });
