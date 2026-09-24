import API from "../api/axiosInstance.js";

export const loginApi = async (credentials) => {
  const { data } = await API.post("/user/login", credentials);
  return data;
};

export const registerApi = async (userData) => {
  const { data } = await API.post("/user/register", userData);
  return data;
};

export const logoutApi = async () => {
  const { data } = await API.post("/user/logout");
  return data;
};

export const getTeamListApi = async (search = "") => {
  const { data } = await API.get("/user/get-team", { params: { search } });
  return data;
};

export const toggleUserStatusApi = async (id, isActive) => {
  const { data } = await API.put(`/user/${id}`, { isActive });
  return data;
};

export const deleteUserApi = async (id) => {
  const { data } = await API.delete(`/user/${id}`);
  return data;
};
