import axios from "axios";
import { refreshToken } from "~/api/auth";

const apiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Произошла ошибка";

      if (error.response.status === 401) {
        const auth = useCookie<string | undefined>(
          import.meta.env.VITE_RESRESH_TOKEN as string
        );
        try {
          const response = await refreshToken();
          auth.value = response.tokens.refreshToken;
          return apiClient.request(error.config);
        } catch (err) {
          auth.value = undefined;
          return navigateTo("/authorize");
        }
      }
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
