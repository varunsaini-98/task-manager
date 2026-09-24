import React, { useContext, useState } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import { Layout } from "./components/layout/Layout.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Tasks } from "./pages/Tasks.jsx";
import { TaskDetails } from "./pages/TaskDetails.jsx";
import { Users } from "./pages/Users.jsx";
import { Trash } from "./pages/Trash.jsx";

const MainApp = () => {
  const { user } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [search, setSearch] = useState("");

  // 1. Unauthenticated View: Toggle between Login & Register screens
  if (!user) {
    return isRegistering ? (
      <Register onSwitchToLogin={() => setIsRegistering(false)} />
    ) : (
      <Login onSwitchToRegister={() => setIsRegistering(true)} />
    );
  }

  // 2. Authenticated View: Render Main Workspace Layout & Pages
  return (
    <Layout
      currentTab={currentTab}
      setCurrentTab={(tab) => {
        setCurrentTab(tab);
        setSelectedTaskId(null); // Reset detail view when switching navigation tabs
      }}
      search={search}
      setSearch={setSearch}
    >
      {selectedTaskId ? (
        <TaskDetails
          taskId={selectedTaskId}
          onBack={() => setSelectedTaskId(null)}
        />
      ) : (
        <>
          {currentTab === "dashboard" && <Dashboard />}
          {currentTab === "tasks" && (
            <Tasks search={search} onSelectTask={setSelectedTaskId} />
          )}
          {currentTab === "todo" && (
            <Tasks
              stageFilter="todo"
              search={search}
              onSelectTask={setSelectedTaskId}
            />
          )}
          {currentTab === "in-progress" && (
            <Tasks
              stageFilter="in progress"
              search={search}
              onSelectTask={setSelectedTaskId}
            />
          )}
          {currentTab === "completed" && (
            <Tasks
              stageFilter="completed"
              search={search}
              onSelectTask={setSelectedTaskId}
            />
          )}
          {currentTab === "users" && <Users />}
          {currentTab === "trash" && <Trash />}
        </>
      )}
    </Layout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
