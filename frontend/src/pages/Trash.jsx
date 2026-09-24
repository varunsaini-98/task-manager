import React, { useEffect, useState } from "react";
import { getTasksApi, deleteRestoreTaskApi } from "../services/taskService.js";
import { Table } from "../components/common/Table.jsx";
import { Button } from "../components/common/Button.jsx";
import { Badge } from "../components/common/Badge.jsx";

export const Trash = () => {
  const [trashedTasks, setTrashedTasks] = useState([]);

  const fetchTrashed = async () => {
    try {
      const data = await getTasksApi({ isTrashed: true });
      const taskList = Array.isArray(data) ? data : data?.tasks || [];
      setTrashedTasks(taskList);
    } catch (err) {
      console.error("Failed to fetch trashed tasks:", err);
      setTrashedTasks([]);
    }
  };

  useEffect(() => {
    fetchTrashed();
  }, []);

  const handleRestore = async (id) => {
    await deleteRestoreTaskApi(id, "restore");
    fetchTrashed();
  };

  const handlePermanentDelete = async (id) => {
    if (window.confirm("Permanently delete this task?")) {
      await deleteRestoreTaskApi(id, "delete");
      fetchTrashed();
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    {
      header: "Stage",
      render: (r) => <Badge status={r.stage}>{r.stage}</Badge>,
    },
    {
      header: "Actions",
      render: (r) => (
        <div className="flex-gap">
          <Button variant="outline" onClick={() => handleRestore(r._id)}>
            Restore
          </Button>
          <Button variant="danger" onClick={() => handlePermanentDelete(r._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="mb-20">Trashed Tasks</h2>
      <Table columns={columns} data={trashedTasks} />
    </div>
  );
};
