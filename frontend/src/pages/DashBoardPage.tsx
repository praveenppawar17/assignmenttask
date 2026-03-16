import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import EmptyProjects from "../components/ui/EmptyProjects";

import toast from "react-hot-toast";
import type { Project } from "../types/project.types";
import ProjectModal from "../components/ui/ProjectModal";
import {
  deleteProject,
  fetchProjects,
} from "../features/projects/projectSlice";
import { fetchDashboardStatsApi } from "../api/dashboardApi";
import UserProjects from "../components/projects/UserProjects";
import Loader from "../components/Loader";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projectCount: 0,
    totalTasks: 0,
    completedTasks: 0,
  });
  const { projects, loading } = useAppSelector((s) => s.projects);
  const user = useAppSelector((s) => s.auth.user);

  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      const res = await fetchDashboardStatsApi();
       if (res.data) {
    setStats(res.data);
  }
    };

    loadStats();
  }, [projects]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (!confirm("Delete this project and all its tasks?")) return;

    await dispatch(deleteProject(id));

    toast.success("Project deleted");
  };

  const handleEdit = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditProject(project);
    setShowModal(true);
  };

  return (
    <div className="p-4 md:p-8">
      <DashboardHeader
        name={user?.name}
        onCreate={() => {
          setEditProject(null);
          setShowModal(true);
        }}
      />

      <DashboardStats
        projectCount={stats.projectCount}
        totalTasks={stats.totalTasks}
        completedTasks={stats.completedTasks}
      />

      {loading ? (
        <Loader />
      ) : projects.length === 0 ? (
        <EmptyProjects onCreate={() => setShowModal(true)} />
      ) : (
        <UserProjects
          projects={projects}
          onProjectClick={(id) => navigate(`/projects/${id}`)}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {showModal && (
        <ProjectModal
          project={editProject}
          onClose={() => {
            setShowModal(false);
            setEditProject(null);
          }}
        />
      )}
    </div>
  );
}
