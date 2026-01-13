import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api",
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = "Bearer " + token;

    config.headers["Accept-Language"] = "en";
    return config;
});

export default axiosInstance;