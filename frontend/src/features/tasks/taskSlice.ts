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
import {
  fetchTasksApi,
  createTaskApi,
  updateTaskApi,
} from "../../api/taskApi";

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<
  Task[],
  { projectId: string; filters?: TaskFilters },
  { rejectValue: string }
>("tasks/fetchTasks", async ({ projectId, filters }, { rejectWithValue }) => {
  try {
    return await fetchTasksApi(projectId, filters);
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Failed to fetch tasks");
  }
});

export const createTask = createAsyncThunk<
  Task,
  CreateTaskInput,
  { rejectValue: string }
>("tasks/createTask", async (data, { rejectWithValue }) => {
  try {
    return await createTaskApi(data);
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Failed to create task");
  }
});

export const updateTask = createAsyncThunk<
  Task,
  { id: string; data: Partial<Task> },
  { rejectValue: string }
>("tasks/updateTask", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await updateTaskApi(id, data);
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Failed to update task");
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    //  reorder Tasks (Drag & Drop)
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },

    clearTaskError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload ?? "Failed to fetch tasks";
      })

      .addCase(createTask.pending, (state) => {
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to create task";
      })

      .addCase(updateTask.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update task";
      });
  },
});

export const { reorderTasks, clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;

