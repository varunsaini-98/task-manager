import React, { useEffect, useState, useContext } from "react";
import { getTasksApi, trashTaskApi } from "../services/taskService.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { BoardView } from "../components/tasks/BoardView.jsx";
import { Table } from "../components/common/Table.jsx";
import { Badge } from "../components/common/Badge.jsx";
import { Button } from "../components/common/Button.jsx";
import { AddTaskModal } from "../components/tasks/AddTaskModal.jsx";

export const Tasks = ({ stageFilter = "", search = "", onSelectTask }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState("board");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasksApi({ stage: stageFilter, search });
      const taskList = Array.isArray(data) ? data : data?.tasks || [];
      setTasks(taskList);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [stageFilter, search]);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCreateTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleTrashTask = async (id) => {
    if (window.confirm("Move this task to Trash?")) {
      try {
        await trashTaskApi(id);
        fetchTasks();
      } catch (err) {
        alert("Failed to trash task");
      }
    }
  };

  const columns = [
    {
      header: "Title",
      render: (row) => (
        <span className="link-title" onClick={() => onSelectTask(row._id)}>
          {row.title}
        </span>
      ),
    },
    {
      header: "Priority",
      render: (r) => <Badge status={r.priority}>{r.priority}</Badge>,
    },
    {
      header: "Stage",
      render: (r) => <Badge status={r.stage}>{r.stage}</Badge>,
    },
    {
      header: "Assigned To",
      render: (r) =>
        r.team && r.team.length > 0
          ? r.team.map((m) => (typeof m === "object" ? m.name : m)).join(", ")
          : "Unassigned",
    },
    {
      header: "Due Date",
      render: (r) => (r.date ? new Date(r.date).toLocaleDateString() : "-"),
    },
    ...(user?.isAdmin
      ? [
          {
            header: "Actions",
            render: (r) => (
              <div className="flex-gap">
                <Button variant="outline" onClick={() => handleEditTask(r)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleTrashTask(r._id)}>
                  Trash
                </Button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div>
      <div className="flex-between mb-20">
        <h2>
          {stageFilter ? `${stageFilter.toUpperCase()} Tasks` : "All Tasks"}
        </h2>
        <div className="flex-gap">
          <Button
            variant={viewMode === "board" ? "primary" : "secondary"}
            onClick={() => setViewMode("board")}
          >
            Board View
          </Button>
          <Button
            variant={viewMode === "table" ? "primary" : "secondary"}
            onClick={() => setViewMode("table")}
          >
            Table View
          </Button>
          {user?.isAdmin && (
            <Button variant="primary" onClick={handleCreateTask}>
              + Create Task
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="page-loader">Loading Tasks...</div>
      ) : viewMode === "board" ? (
        <BoardView
          tasks={tasks}
          onTaskClick={onSelectTask}
          onTaskUpdated={fetchTasks}
          onEditTask={handleEditTask}
          isAdmin={user?.isAdmin}
        />
      ) : (
        <Table columns={columns} data={tasks} />
      )}

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        onTaskSaved={fetchTasks}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};
