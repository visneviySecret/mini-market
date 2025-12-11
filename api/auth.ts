import apiClient from "~/utils/axios";

async function signup(email: string, password: string) {
  const response = await apiClient.post("/users/signup", { email, password });
  return response.data;
}

async function login(email: string, password: string) {
  const response = await apiClient.post("/users/login", { email, password });
  return response.data;
}

async function refreshToken() {
  const response = await apiClient.post("/users/refresh-token");
  return response.data;
}

export { signup, login, refreshToken };
