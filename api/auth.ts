import apiClient from "~/utils/axios";

async function signup(email: string, password: string) {
  const response = await apiClient.post("/users/signup", { email, password });
  return response.data;
}

async function login(email: string, password: string) {
  const response = await apiClient.post("/users/login", { email, password });
  return response.data;
}

export { signup, login };
