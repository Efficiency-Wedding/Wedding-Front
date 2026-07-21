import axios, { type AxiosInstance } from "axios";
import { Env } from "./env";

let axiosInstance: AxiosInstance | null = null;

export const getAxios = (): AxiosInstance => {
  if (axiosInstance !== null) {
    return axiosInstance;
  }

  axiosInstance = axios.create({
    baseURL: Env.API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");

      const publicRoutes = ["/api/login", "/api/register"];

      if (token && !publicRoutes.includes(config.url ?? "")) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
  return axiosInstance;
};
