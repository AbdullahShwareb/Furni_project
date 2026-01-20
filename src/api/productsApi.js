import axiosInstance from "./axiosInstance";

export async function getProductsApi() {
  const res = await axiosInstance.get("/Products", {
    params: { lang: "en" },
  });

  const data = res.data;

  if (Array.isArray(data)) return data;

  if (data && Array.isArray(data.response)) return data.response;
  if (data && data.response && Array.isArray(data.response.items))
    return data.response.items;
  if (data && data.response && Array.isArray(data.response.data))
    return data.response.data;

  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.data)) return data.data;

  return [];
}

export async function getProductDetailsApi(id) {
  const res = await axiosInstance.get(`/Products/${id}`, {
    params: { lang: "en" },
  });
  return res.data;
}
