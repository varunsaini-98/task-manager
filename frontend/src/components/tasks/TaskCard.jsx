import React from "react";
import { Badge } from "../common/Badge.jsx";
import {
  updateTaskStageApi,
  trashTaskApi,
} from "../../services/taskService.js";

export const TaskCard = ({
  task,
  onClick,
  onTaskUpdated,
  onEditTask,
  isAdmin = false,
}) => {
  const handleStageChange = async (e) => {
    e.stopPropagation();
    const newStage = e.target.value;
    try {
      await updateTaskStageApi(task._id, newStage);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      alert("Failed to update task stage");
    }
  };

  const handleTrash = async (e) => {
    e.stopPropagation();
    if (window.confirm("Move this task to Trash?")) {
      try {
        await trashTaskApi(task._id);
        if (onTaskUpdated) onTaskUpdated();
      } catch (err) {
        alert("Failed to move task to trash");
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEditTask) onEditTask(task);
  };

  return (
    <div className="task-card" onClick={() => onClick && onClick(task._id)}>
      <div className="flex-between">
        <Badge status={task.priority}>{task.priority} Priority</Badge>
        <div className="flex-gap" onClick={(e) => e.stopPropagation()}>
          {isAdmin && (
            <>
              <button
                onClick={handleEdit}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                title="Edit / Re-assign Task"
              >
                🖋️
              </button>
              <button
                onClick={handleTrash}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                title="Move to Trash"
              >
                🗑️
              </button>
            </>
          )}
          <span className="task-date">
            {task.date ? new Date(task.date).toLocaleDateString() : ""}
          </span>
        </div>
      </div>

      <h4 className="task-title">{task.title}</h4>
      <p className="task-desc">
        {task.description || "No description provided."}
      </p>

      {/* Assigned Team Members */}
      {task.team && task.team.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "8px",
            fontSize: "11px",
            color: "#64748b",
          }}
        >
          Assigned:{" "}
          {task.team
            .map((m) => (typeof m === "object" ? m.name : m))
            .join(", ")}
        </div>
      )}

      <div
        className="flex-between task-footer"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="subtask-count">
          Subtasks: {task.subTasks?.length || 0}
        </span>

        <select
          value={task.stage}
          onChange={handleStageChange}
          className="input-field"
          style={{ padding: "2px 6px", fontSize: "12px" }}
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};
