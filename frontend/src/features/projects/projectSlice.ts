import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Project, ProjectState } from "../../types/project.types";
import {
  deleteProjectApi,
  fetchProjectsApi,
  createProjectApi,
  updateProjectApi,
} from "../../api/projectApi";

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { rejectValue: string }
>("projects/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    return await fetchProjectsApi();
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Failed to fetch projects");
  }
});

export const deleteProject = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("projects/deleteProject", async (id, { rejectWithValue }) => {
  try {
    await deleteProjectApi(id);
    return id;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Failed to delete project");
  }
});

export const createProject = createAsyncThunk<
  Project,
  { projectName: string; description?: string },
  { rejectValue: string }
>("projects/createProject", async (data, { rejectWithValue }) => {
  try {
    return await createProjectApi(data);
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Failed to create project");
  }
});

export const updateProject = createAsyncThunk<
  Project,
  { id: string; data: { projectName: string; description?: string } },
  { rejectValue: string }
>("projects/updateProject", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await updateProjectApi(id, data);
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Failed to update project");
  }
});

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch projects";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (p) => p._id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload ?? "Delete failed";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.error = action.payload ?? "Create failed";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action.payload ?? "Update failed";
      });
  },
});

export default projectSlice.reducer;
