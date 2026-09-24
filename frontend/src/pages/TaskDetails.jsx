import React, { useEffect, useState } from "react";
import {
  getTaskDetailsApi,
  postTaskActivityApi,
  updateTaskStageApi,
  updateSubTaskStageApi,
} from "../services/taskService.js";
import { Card } from "../components/common/Card.jsx";
import { Badge } from "../components/common/Badge.jsx";
import { Button } from "../components/common/Button.jsx";
import { AddSubTaskModal } from "../components/tasks/AddSubTaskModal.jsx";

export const TaskDetails = ({ taskId, onBack }) => {
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");
  const [isSubTaskModalOpen, setIsSubTaskModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const data = await getTaskDetailsApi(taskId);
      setTask(data.task || data);
    } catch (err) {
      console.error("Failed to load task details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) fetchTask();
  }, [taskId]);

  const handleStageChange = async (newStage) => {
    try {
      await updateTaskStageApi(taskId, newStage);
      fetchTask();
    } catch (err) {
      alert("Failed to update task stage");
    }
  };

  const handleSubtaskToggle = async (subTaskId, currentStatus) => {
    try {
      await updateSubTaskStageApi(taskId, subTaskId, !currentStatus);
      fetchTask();
    } catch (err) {
      alert("Failed to update subtask status");
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await postTaskActivityApi(taskId, {
        type: "commented",
        activity: comment,
      });
      setComment("");
      fetchTask();
    } catch (err) {
      alert("Failed to post activity");
    }
  };

  if (loading || !task)
    return <div className="page-loader">Loading Task Details...</div>;

  return (
    <div className="task-details-page">
      <Button variant="secondary" onClick={onBack} className="mb-16">
        &larr; Back to Tasks
      </Button>

      <div className="flex-between mb-16" style={{ alignItems: "center" }}>
        <h2>{task.title}</h2>

        {/* Top Right Header: Distinct Priority (Non-Editable) & Status (Editable) */}
        <div className="flex-gap" style={{ alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#64748b" }}
            >
              Priority:
            </span>
            <Badge status={task.priority}>
              {task.priority?.toUpperCase()} Priority
            </Badge>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginLeft: "12px",
            }}
          >
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#64748b" }}
            >
              Status:
            </span>
            <select
              value={task.stage}
              onChange={(e) => handleStageChange(e.target.value)}
              className="input-field"
              style={{
                padding: "6px 10px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              <option value="todo">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description Card */}
      <Card className="mb-20">
        <h3 style={{ marginBottom: "8px" }}>Description</h3>
        <p
          className="task-desc-text"
          style={{
            fontSize: "14px",
            color: "#334155",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
          }}
        >
          {task.description && task.description.trim() !== ""
            ? task.description
            : "No detailed description provided."}
        </p>
      </Card>

      {/* Subtasks Card */}
      <Card className="mb-20">
        <div className="flex-between mb-12">
          <h3>Subtasks ({task.subTasks?.length || 0})</h3>
          <Button variant="outline" onClick={() => setIsSubTaskModalOpen(true)}>
            + Add Subtask
          </Button>
        </div>
        <div className="subtask-list">
          {task.subTasks && task.subTasks.length > 0 ? (
            task.subTasks.map((sub) => (
              <div key={sub._id} className="subtask-item">
                <input
                  type="checkbox"
                  checked={sub.isCompleted}
                  onChange={() => handleSubtaskToggle(sub._id, sub.isCompleted)}
                />
                <span className={sub.isCompleted ? "completed-text" : ""}>
                  {sub.title} ({sub.tag})
                </span>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "13px", color: "#64748b" }}>
              No subtasks created yet.
            </p>
          )}
        </div>
      </Card>

      {/* Activity Log & Comments */}
      <Card>
        <h3>Activity Log & Comments</h3>
        <form onSubmit={handleAddActivity} className="flex-gap my-16">
          <input
            type="text"
            className="input-field"
            placeholder="Add a comment or update..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button type="submit">Post</Button>
        </form>

        <div className="timeline">
          {task.activities?.map((act, index) => (
            <div key={index} className="timeline-item">
              <span className="timeline-user">{act.by?.name || "User"}:</span>{" "}
              <span>{act.activity}</span>
              <div className="timeline-date">
                {new Date(act.date).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <AddSubTaskModal
        isOpen={isSubTaskModalOpen}
        onClose={() => setIsSubTaskModalOpen(false)}
        taskId={taskId}
        onSubTaskCreated={fetchTask}
      />
    </div>
  );
};
