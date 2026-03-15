import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../features/auth/authSlice";
 
export default function Layout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
 
  return (
    <div className="flex flex-col md:flex-row h-screen"> 
      <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col">
 
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-semibold">Task Manager</h1>
        </div>
 
        <nav className="flex-1 p-4 space-y-2">
 
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
 
        </nav>
 
        <div className="p-4 border-t border-gray-700">
 
          <p className="text-sm">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
 
          <button
            onClick={handleLogout}
            className="mt-3 bg-red-500 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
 
        </div>
      </aside>
      <header className="md:hidden flex items-center justify-between bg-gray-900 text-white px-4 py-3 border-b border-gray-700">
        <h1 className="text-lg font-semibold">Task Manager</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded text-xs"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-3 md:p-6">
        <Outlet />
      </main>
 
    </div>
  );
}
