import type { TaskCardProps } from "../types/task.types";

export default function TaskCard({ task, onEdit, dragHandleProps }: TaskCardProps) {

  const formattedDueDate = task.dueDate
    ? new Intl.DateTimeFormat("en-GB").format(new Date(task.dueDate))
    : null;

  return (
    <div
      {...dragHandleProps}
      className="card p-3 cursor-pointer hover:bg-accent/10 transition-colors"
      onClick={() => onEdit(task)}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold text-white text-sm">{task.title}</h4>

        {task.priority && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              task.priority === "High"
                ? "bg-red-500 text-white"
                : task.priority === "Medium"
                ? "bg-yellow-400 text-black"
                : "bg-green-400 text-black"
            }`}
          >
            {task.priority}
          </span>
        )}
      </div>

      {task.description && (
        <p className="text-gray-400 text-xs">{task.description}</p>
      )}

      {formattedDueDate && (
        <p className="text-gray-500 text-xxs mt-1">
          Due: {formattedDueDate}
        </p>
      )}
    </div>
  );
}











// import type { TaskCardProps } from "../types/task.types";

// export default function TaskCard({ task, onEdit, dragHandleProps }: TaskCardProps) {
//   console.log()
//   return (
//     <div
//       {...dragHandleProps}
//       className="card p-3 cursor-pointer hover:bg-accent/10 transition-colors"
//       onClick={() => onEdit(task)}
//     >
//       <div className="flex items-center justify-between mb-1">
//         <h4 className="font-semibold text-white text-sm">{task.title}</h4>
//         {task.priority && (
//           <span
//             className={`text-xs px-2 py-0.5 rounded-full ${
//               task.priority === "High"
//                 ? "bg-red-500 text-white"
//                 : task.priority === "Medium"
//                 ? "bg-yellow-400 text-black"
//                 : "bg-green-400 text-black"
//             }`}
//           >
//             {task.priority}
//           </span>
//         )}
//       </div>
//       {task.description && <p className="text-gray-400 text-xs">{task.description}</p>}
//       {task.dueDate && <p className="text-gray-500 text-xxs mt-1">Due: {task.dueDate}</p>}
//     </div>
//   )
// }
