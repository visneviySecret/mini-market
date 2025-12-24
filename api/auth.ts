import axios from "axios";
import apiClient from "~/utils/axios";

const refreshClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

async function signup(email: string, password: string) {
  const response = await apiClient.post("/users/signup", { email, password });
  return response.data;
}

async function login(email: string, password: string) {
  const response = await apiClient.post("/users/login", { email, password });
  return response.data;
}

async function refreshToken() {
  const response = await refreshClient.get("/users/refresh-token");
  return response.data;
}

async function logout() {
  const response = await apiClient.post("/users/logout");
  return response.data;
}

export { signup, login, refreshToken, logout };
