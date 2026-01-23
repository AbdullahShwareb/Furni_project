import axiosInstance from "./axiosInstance";

function normalizeProductsList(data) {
  if (!data) return [];

  if (Array.isArray(data)) return data;

  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.data)) return data.data;

  if (data.response) {
    const r = data.response;

    if (Array.isArray(r)) return r;
    if (Array.isArray(r.items)) return r.items;
    if (Array.isArray(r.data)) return r.data; 
  }

  return [];
}


export async function fetchProductsApi({ limit = 12 } = {}) {
  const res = await axiosInstance.get("/Products", {
    params: { limit },
  });

  return normalizeProductsList(res.data);
}


export async function getProductsApi({ limit = 1000, categoryId } = {}) {
  const params = { limit };

  if (categoryId && categoryId !== "all") {
    params.categoryId = categoryId;
  }

  const res = await axiosInstance.get("/Products", { params });

  return normalizeProductsList(res.data);
}


export async function getProductDetailsApi(id) {
  const res = await axiosInstance.get(`/Products/${id}`);

  const data = res.data;

  if (data && data.response) return data.response;

  return data;
}
