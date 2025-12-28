import axiosInstance from "./axiosInstance";

export const fetchCategoriesApi = async() => {
    const res = await axiosInstance.get("/Categories", {
        params: { lang: "en" },
    });
    return res.data;
};