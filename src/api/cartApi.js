import axiosInstance from "./axiosInstance";

// Get cart items
export async function getCartItemsApi() {
  const res = await axiosInstance.get("/Carts");
  const data = res.data;

  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  if (data && data.response && Array.isArray(data.response.items)) {
    return data.response.items;
  }

  return [];
}

// Add to cart
export async function addToCartApi(productId, count) {
  const res = await axiosInstance.post("/Carts", {
    ProductId: productId,
    Count: count || 1,
  });
  return res.data;
}

export async function updateCartQuantityApi(productId, count) {
  const res = await axiosInstance.patch(`/Carts/${productId}`, {
    count, // NOT Count
  });
  return res.data;
}

// Remove one item
export async function removeFromCartApi(productId) {
  const res = await axiosInstance.delete(`/Carts/${productId}`);
  return res.data;
}

// Clear all cart
export async function clearCartApi() {
  const res = await axiosInstance.delete("/Carts/clear");
  return res.data;
}
