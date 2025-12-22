import axiosInstance from "./axiosInstance";

export const fetchCategoriesApi = async() => {
    const response = await axiosInstance.get("/Categories");
    return response.data;
};