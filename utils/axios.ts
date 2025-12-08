import axios from "axios";

const apiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
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
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Произошла ошибка";

      if (error.response.status === 401) {
        const auth = useCookie<string | undefined>(
          import.meta.env.VITE_RESRESH_TOKEN as string
        );
        auth.value = undefined;
        return navigateTo("/authorize");
      }
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
