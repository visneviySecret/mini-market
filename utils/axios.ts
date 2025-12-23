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
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest?._isRetry) {
        originalRequest._isRetry = true;
        const auth = useCookie<string | undefined>(
          import.meta.env.VITE_REFRESH_TOKEN as string
        );
        auth.value = undefined;
        try {
          const response = await refreshToken();
          auth.value = response.tokens.refreshToken;
          return apiClient.request(error.config);
        } catch (err) {
          // TODO это поведение по переадресации на авторизацию всегда вызывается,
          // даже когда рефреш успешно пришёл, пока уберём
          // return navigateTo("/authorize");
        }
      }
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
