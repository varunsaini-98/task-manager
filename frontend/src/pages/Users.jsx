import React, { useEffect, useState } from "react";
import {
  getTeamListApi,
  toggleUserStatusApi,
  deleteUserApi,
} from "../services/userService.js";
import { Table } from "../components/common/Table.jsx";
import { Button } from "../components/common/Button.jsx";
import { Badge } from "../components/common/Badge.jsx";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getTeamListApi();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    await toggleUserStatusApi(id, !currentStatus);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUserApi(id);
      fetchUsers();
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    {
      header: "Status",
      render: (r) => (
        <Badge status={r.isActive ? "completed" : "high"}>
          {r.isActive ? "Active" : "Disabled"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      render: (r) => (
        <div className="flex-gap">
          <Button
            variant="outline"
            onClick={() => handleToggleStatus(r._id, r.isActive)}
          >
            {r.isActive ? "Disable" : "Enable"}
          </Button>
          <Button variant="danger" onClick={() => handleDelete(r._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading)
    return <div className="page-loader">Loading Team Members...</div>;

  return (
    <div>
      <h2 className="mb-20">Team Directory</h2>
      <Table columns={columns} data={users} />
    </div>
  );
};
