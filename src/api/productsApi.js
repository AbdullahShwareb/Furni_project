import axiosInstance from "./axiosInstance";

function normalizeProductsList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && data.response && Array.isArray(data.response.items))
    return data.response.items;
  if (data && data.response && Array.isArray(data.response.data))
    return data.response.data;
  return [];
}

export async function fetchProductsApi({ lang = "en", limit = 12 } = {}) {
  const res = await axiosInstance.get("/Products", {
    params: { limit },
    headers: {
      "Accept-Language": lang,
    },
  });

  return normalizeProductsList(res.data);
}

export async function getProductsApi({ limit = 1000, categoryId } = {}) {
  let url = "/Products";
  const params = { limit };

  if (categoryId && categoryId !== "all") {
    url = `/Products/category/${categoryId}`;
  }

  const res = await axiosInstance.get(url, {
    params,
    headers: {
      "Accept-Language": "en",
    },
  });

  return normalizeProductsList(res.data);
}

// ✅ تفاصيل المنتج
export async function getProductDetailsApi(id) {
  const res = await axiosInstance.get(`/Products/${id}`, {
    headers: {
      "Accept-Language": "en",
    },
  });

  const data = res.data;

  // في حال الـ API رجّعها جوه data أو response
  if (data && data.response) return data.response;
  if (data && data.data) return data.data;

  return data;
}
