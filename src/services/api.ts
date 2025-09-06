import axios from "axios";
import { ApiError } from "./apiError";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://abitus-api.geia.vip/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      
      throw new ApiError(
        error.response.data?.message || "Erro na requisição",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      
      throw new ApiError("Falha de conexão com o servidor");
    } else {
      
      throw new ApiError(error.message);
    }
  }
);

export default api;
