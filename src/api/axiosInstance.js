import axios from "axios";

const isProd = import.meta.env.PROD; 

const axiosInstance = axios.create({
  baseURL: isProd
    ? "https://knowledgeshop.runasp.net/api" 
    : "/api",                               
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = "Bearer " + token;

  config.headers["Accept-Language"] = "en";
  return config;
});

export default axiosInstance;
