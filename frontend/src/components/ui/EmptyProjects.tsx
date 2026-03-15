type Props = {
  onCreate: () => void
}

export default function EmptyProjects({ onCreate }: Props) {
  return (
    <div className="card p-16 text-center">
      <h3 className="font-display font-semibold text-white mb-2">
        No projects yet
      </h3>

      <p className="text-gray-500 text-sm mb-5">
        Create your first project to get started
      </p>

      <button onClick={onCreate} className="btn-primary">
        Create Project
      </button>
    </div>
  )
}