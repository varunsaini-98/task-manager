import React, { useState } from "react";
import { Modal } from "../common/Modal.jsx";
import { Input } from "../common/Input.jsx";
import { Button } from "../common/Button.jsx";
import { createSubTaskApi } from "../../services/taskService.js";

export const AddSubTaskModal = ({
  isOpen,
  onClose,
  taskId,
  onSubTaskCreated,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "Frontend",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSubTaskApi(taskId, formData);
      onSubTaskCreated();
      onClose();
      setFormData({ title: "", tag: "Frontend", date: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add subtask");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Subtask">
      <form onSubmit={handleSubmit}>
        <Input
          label="Subtask Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          label="Tag / Component"
          value={formData.tag}
          placeholder="e.g. Frontend, Backend, API"
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
        />
        <Input
          label="Due Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <div className="flex-between mt-16">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Subtask"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
