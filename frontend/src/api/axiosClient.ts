import axios from "axios";

export const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  withCredentials: true
});

// global response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  }
);