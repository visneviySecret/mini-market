import apiClient from "~/utils/axios";

export async function getUserMe() {
  const response = await apiClient.get("/users/me");
  return response.data;
}
