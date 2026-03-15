import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd"

import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { useTaskFilters } from "../hooks/useTaskFilters"

import {
  fetchTasks,
  reorderTasks,
  updateTask,
} from "../features/tasks/taskSlice"

import { fetchProjects } from "../features/projects/projectSlice"

import toast from "react-hot-toast"

import TaskCard from "../components/TaskCard"
import TaskModal from "../components/TaskModal"

import {
  columnStyleConstant,
  TASK_PRIORITY,
  TASK_STATUS,
} from "../constants"

import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "../types/task.types"

const STATUSES: TaskStatus[] = Object.values(TASK_STATUS)

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { tasks, loading } = useAppSelector((s) => s.tasks)

  const project = useAppSelector((s) =>
    s.projects.projects.find((p) => p._id === id)
  )

  const [editTask, setEditTask] = useState<Task | null>(null)
  const [showModal, setShowModal] = useState(false)

  const { filters, setFilters, apiFilters, clearFilters, hasFilters } =
    useTaskFilters()

  useEffect(() => {
    if (!project) dispatch(fetchProjects())
    if (id) dispatch(fetchTasks({ projectId: id }))
  }, [id])

  const applyFilters = () => {
    if (!id) return
    dispatch(fetchTasks({ projectId: id, filters: apiFilters }))
  }

  const handleClearFilters = () => {
    clearFilters()
    if (id) dispatch(fetchTasks({ projectId: id }))
  }

  const tasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status)

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    const newStatus = destination.droppableId as TaskStatus
    const oldStatus = source.droppableId as TaskStatus

    if (newStatus === oldStatus && destination.index === source.index)
      return

    const updatedTasks = tasks.map((t) =>
      t._id === draggableId ? { ...t, status: newStatus } : t
    )

    dispatch(reorderTasks(updatedTasks))

    try {
      await dispatch(
        updateTask({
          id: draggableId,
          data: { status: newStatus },
        })
      ).unwrap()
    } catch {
      dispatch(reorderTasks(tasks))
      toast.error("Failed to update task status")
    }
  }

  return (
    <div className="p-3 md:p-8 h-full flex flex-col animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-white transition-colors"
        >
          &#8592;
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="font-display text-lg md:text-2xl font-bold text-white truncate">
            {project?.projectName || "Project"}
          </h1>

          {project?.description && (
            <p className="text-gray-500 text-sm mt-0.5 truncate">
              {project.description}
            </p>
          )}
        </div>

        <button
          onClick={() => {
            setEditTask(null)
            setShowModal(true)
          }}
          className="btn-primary flex items-center gap-2 flex-shrink-0"
        >
          + Add Task
        </button>
      </div>

      <div className="card px-3 md:px-4 py-3 mb-6 flex items-center gap-2 md:gap-3 flex-wrap">
        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
          Filters
        </span>

        <select
          className="input !py-1.5 !px-3 text-xs w-36"
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              status: e.target.value as TaskStatus | "",
            }))
          }
        >
          <option value="">All Statuses</option>

          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          className="input !py-1.5 !px-3 text-xs w-36"
          value={filters.priority}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              priority: e.target.value as TaskPriority | "",
            }))
          }
        >
          <option value="">All Priorities</option>

          {Object.values(TASK_PRIORITY).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="input !py-1.5 !px-3 text-xs w-40"
          value={filters.dueDate}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              dueDate: e.target.value,
            }))
          }
        />

        <button
          onClick={applyFilters}
          className="btn-primary !py-1.5 !px-3 text-xs"
        >
          Apply
        </button>

        {hasFilters && (
          <button
            onClick={handleClearFilters}
            className="btn-ghost !py-1.5 !px-3 text-xs text-gray-500"
          >
            Clear
          </button>
        )}

        <span className="ml-auto text-xs text-gray-600 font-mono">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* darag and drpo here */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="loader" />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex md:grid md:grid-cols-3 gap-5 flex-1 min-h-0 overflow-x-auto pb-2">
            {STATUSES.map((status) => {
              const col = columnStyleConstant[status]
              const colTasks = tasksByStatus(status)

              return (
                <div
                  key={status}
                  className="flex flex-col min-h-0 min-w-[280px] md:min-w-0"
                >
                  <div className="flex items-center gap-2.5 mb-3 px-1">
                    <div className={`w-2 h-2 rounded-full ${col.dot}`} />

                    <h3
                      className={`font-display font-semibold text-sm ${col.header}`}
                    >
                      {status}
                    </h3>

                    <span
                      className={`ml-auto text-xs font-mono px-2 py-0.5 rounded-full ${col.count}`}
                    >
                      {colTasks.length}
                    </span>
                  </div>

                  <Droppable droppableId={status}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 overflow-y-auto space-y-3 rounded-2xl p-2 transition-colors duration-150 ${
                          snapshot.isDraggingOver
                            ? "bg-accent/5 ring-1 ring-accent/20"
                            : ""
                        }`}
                      >
                        {colTasks.length === 0 &&
                          !snapshot.isDraggingOver && (
                            <div className="h-24 flex items-center justify-center border-2 border-dashed border-border rounded-xl">
                              <p className="text-xs text-gray-600">
                                Drop tasks here
                              </p>
                            </div>
                          )}

                        {colTasks.map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging
                                    ? 0.9
                                    : 1,
                                }}
                              >
                                <TaskCard
                                  task={task}
                                  onEdit={(t) => {
                                    setEditTask(t)
                                    setShowModal(true)
                                  }}
                                  dragHandleProps={
                                    provided.dragHandleProps
                                  }
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </div>
        </DragDropContext>
      )}

      {showModal && id && (
        <TaskModal
          projectId={id}
          task={editTask}
          onClose={() => {
            setShowModal(false)
            setEditTask(null)
          }}
        />
      )}
    </div>
  )
}

