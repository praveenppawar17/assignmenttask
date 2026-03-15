import { useState, useEffect } from "react"
import { useAppDispatch } from "../../hooks/redux"
import { createProject, updateProject } from "../../features/projects/projectSlice"
import toast from "react-hot-toast"
import type { ProjectModalProps } from "../../types/project.types"

export default function ProjectModal({ onClose, project }: ProjectModalProps) {
  const dispatch = useAppDispatch()

  const [form, setForm] = useState({
    projectName: "",
    description: ""
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (project) {
      setForm({
        projectName: project.projectName,
        description: project.description || ""
      })
    }
  }, [project])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.projectName.trim()) e.name = "Project name is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    try {
      if (project) {
        await dispatch(
          updateProject({ id: project._id, data: form })
        ).unwrap()
        toast.success("Project updated")
      } else {
        await dispatch(createProject(form)).unwrap()
        toast.success("Project created")
      }
      onClose()
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message)
      else toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">
            {project ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            Close
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Project Name
            </label>
            <input
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              value={form.projectName}
              onChange={(e) => setForm(f => ({ ...f, projectName: e.target.value }))}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Description
            </label>
            <textarea
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              rows={3}
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 bg-gray-700 text-white py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Saving..." : project ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  )
}
