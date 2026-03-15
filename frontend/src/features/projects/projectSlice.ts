import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { Project, ProjectState } from "../../types/project.types"
import {
  deleteProjectApi,
  fetchProjectsApi,
  createProjectApi,
  updateProjectApi,
} from "../../api/projectApi"

const initialState: ProjectState = {
  projects: [],
  loading: false,
}

// Fetch all projects
export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async () => {
    const res = await fetchProjectsApi()
    return res.data ?? []
  }
)

// Delete a project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string) => {
    await deleteProjectApi(id)
    return id
  }
)

// Create a new project
export const createProject = createAsyncThunk<Project, { projectName: string; description?: string }>(
  "projects/createProject",
  async (data) => {
    const res = await createProjectApi(data)
    if (!res.success) throw new Error(res.message)
    return res.data!
  }
)

// Update an existing project
export const updateProject = createAsyncThunk<Project, { id: string; data: { projectName: string; description?: string } }>(
  "projects/updateProject",
  async ({ id, data }) => {
    const res = await updateProjectApi(id, data)
    if (!res.success) throw new Error(res.message)
    return res.data!
  }
)

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProjects
      .addCase(fetchProjects.pending, (state) => { state.loading = true })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state) => { state.loading = false })

      // deleteProject
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload)
      })

      // createProject
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload)
      })

      // updateProject
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(p => p._id === action.payload._id)
        if (index !== -1) state.projects[index] = action.payload
      })
  }
})

export default projectSlice.reducer
