import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal.jsx";
import { Input } from "../common/Input.jsx";
import { Button } from "../common/Button.jsx";
import { createTaskApi, updateTaskApi } from "../../services/taskService.js";
import { getTeamListApi } from "../../services/userService.js";

export const AddTaskModal = ({
  isOpen,
  onClose,
  onTaskSaved,
  taskToEdit = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    stage: "todo",
    priority: "medium",
    date: "",
    description: "",
    team: [],
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Fetch active team members
      getTeamListApi()
        .then((data) => setTeamMembers(Array.isArray(data) ? data : []))
        .catch(console.error);

      // Pre-fill form if editing an existing task
      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title || "",
          stage: taskToEdit.stage || "todo",
          priority: taskToEdit.priority || "medium",
          date: taskToEdit.date ? taskToEdit.date.split("T") : "",
          description: taskToEdit.description || "",
          team: Array.isArray(taskToEdit.team)
            ? taskToEdit.team.map((m) => (typeof m === "object" ? m._id : m))
            : [],
        });
      } else {
        setFormData({
          title: "",
          stage: "todo",
          priority: "medium",
          date: "",
          description: "",
          team: [],
        });
      }
    }
  }, [isOpen, taskToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeamToggle = (userId) => {
    const updatedTeam = formData.team.includes(userId)
      ? formData.team.filter((id) => id !== userId)
      : [...formData.team, userId];
    setFormData({ ...formData, team: updatedTeam });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.team.length === 0) {
      setError("Please assign at least one team member.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (taskToEdit) {
        await updateTaskApi(taskToEdit._id, formData);
      } else {
        await createTaskApi(formData);
      }
      onTaskSaved();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? "Edit & Re-assign Task" : "Create & Assign Task"}
    >
      {error && <div className="error-alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <Input
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div className="input-group">
          <label className="input-label">Assign Team Members *</label>
          <div
            style={{
              maxHeight: "120px",
              overflowY: "auto",
              border: "1px solid #e2e8f0",
              padding: "8px",
              borderRadius: "6px",
            }}
          >
            {teamMembers.map((member) => (
              <label
                key={member._id}
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  marginBottom: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.team.includes(member._id)}
                  onChange={() => handleTeamToggle(member._id)}
                />
                <span>
                  {member.name} ({member.role || member.title})
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Stage</label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="input-field"
          >
            <option value="todo">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-field"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>

        <Input
          label="Due Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <div className="input-group">
          <label className="input-label">Description</label>
          <textarea
            name="description"
            rows="3"
            className="input-field"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex-between mt-16">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : taskToEdit
                ? "Update Task"
                : "Assign & Save Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
