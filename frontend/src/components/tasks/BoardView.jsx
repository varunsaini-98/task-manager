import React from "react";
import { TaskCard } from "./TaskCard.jsx";

export const BoardView = ({
  tasks = [],
  onTaskClick,
  onTaskUpdated,
  onEditTask,
  isAdmin = false,
}) => {
  const stages = ["todo", "in progress", "completed"];
  const taskList = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="kanban-board">
      {stages.map((stage) => {
        const stageTasks = taskList.filter((t) => t.stage === stage);
        return (
          <div key={stage} className="kanban-column">
            <div className="column-header">
              <span className="column-title">{stage.toUpperCase()}</span>
              <span className="column-count">{stageTasks.length}</span>
            </div>
            <div className="column-body">
              {stageTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onClick={onTaskClick}
                  onTaskUpdated={onTaskUpdated}
                  onEditTask={onEditTask}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
