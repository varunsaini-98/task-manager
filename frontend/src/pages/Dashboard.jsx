import React, { useEffect, useState } from "react";
import { getDashboardStatsApi } from "../services/taskService.js";
import { Card } from "../components/common/Card.jsx";
import { Table } from "../components/common/Table.jsx";
import { Badge } from "../components/common/Badge.jsx";

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStatsApi()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader">Loading Dashboard...</div>;

  const columns = [
    { header: "Task Title", accessor: "title" },
    {
      header: "Priority",
      render: (row) => <Badge status={row.priority}>{row.priority}</Badge>,
    },
    {
      header: "Stage",
      render: (row) => <Badge status={row.stage}>{row.stage}</Badge>,
    },
  ];

  return (
    <div className="dashboard-page">
      <h2>Dashboard Metrics</h2>
      <div className="grid-4 my-20">
        <Card title="Total Tasks">
          <span className="stat-num">{stats?.totalTasks || 0}</span>
        </Card>
        <Card title="To Do">
          <span className="stat-num">{stats?.tasks?.todo || 0}</span>
        </Card>
        <Card title="In Progress">
          <span className="stat-num">{stats?.tasks?.["in progress"] || 0}</span>
        </Card>
        <Card title="Completed">
          <span className="stat-num">{stats?.tasks?.completed || 0}</span>
        </Card>
      </div>

      <h3>Recent Activity</h3>
      <Table columns={columns} data={stats?.last10Task || []} />
    </div>
  );
};
