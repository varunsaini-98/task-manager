import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

export const Sidebar = ({ currentTab, setCurrentTab }) => {
  const { user } = useContext(AuthContext);

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "tasks", label: "Tasks" },
    { id: "completed", label: "Completed Tasks" },
    { id: "in-progress", label: "In Progress" },
    { id: "todo", label: "To Do" },
    ...(user?.isAdmin
      ? [
          { id: "users", label: "👥 Team Members" },
          { id: "trash", label: "🗑️ Trash" },
        ]
      : []),
  ];

  return (
    <aside className="sidebar">
      <div className="brand">TaskFlow</div>
      <nav className="nav-list">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${currentTab === item.id ? "active" : ""}`}
            onClick={() => setCurrentTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
