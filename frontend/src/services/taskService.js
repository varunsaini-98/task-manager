import API from "../api/axiosInstance.js";

export const getDashboardStatsApi = async () => {
  const { data } = await API.get("/task/dashboard");
  return data;
};

export const getTasksApi = async (params = {}) => {
  const { data } = await API.get("/task", { params });
  return data;
};

export const getTaskDetailsApi = async (id) => {
  const { data } = await API.get(`/task/${id}`);
  return data;
};

export const createTaskApi = async (taskData) => {
  const { data } = await API.post("/task/create", taskData);
  return data;
};

// Edit / Re-assign existing task
export const updateTaskApi = async (id, taskData) => {
  const { data } = await API.put(`/task/update/${id}`, taskData);
  return data;
};

// Soft-delete (Move task to Trash)
export const trashTaskApi = async (id) => {
  const { data } = await API.put(`/task/${id}`);
  return data;
};

export const updateTaskStageApi = async (id, stage) => {
  const { data } = await API.put(`/task/change-stage/${id}`, { stage });
  return data;
};

export const createSubTaskApi = async (id, subTaskData) => {
  const { data } = await API.put(`/task/create-subtask/${id}`, subTaskData);
  return data;
};

export const updateSubTaskStageApi = async (taskId, subTaskId, status) => {
  const { data } = await API.put(`/task/change-status/${taskId}/${subTaskId}`, {
    status,
  });
  return data;
};

export const postTaskActivityApi = async (id, activityData) => {
  const { data } = await API.post(`/task/activity/${id}`, activityData);
  return data;
};

// Permanent Delete or Restore from Trash
export const deleteRestoreTaskApi = async (id, actionType) => {
  const { data } = await API.delete(`/task/delete-restore/${id || ""}`, {
    params: { actionType },
  });
  return data;
};
