import axiosInstance from "./axiosInstance";

export const fetchCategoriesApi = async () => {
  const res = await axiosInstance.get("/Categories");
  const data = res.data;

  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.response)) return data.response;
  if (data && data.response && Array.isArray(data.response.items))
    return data.response.items;
  if (data && data.response && Array.isArray(data.response.data))
    return data.response.data;

  return [];
};
