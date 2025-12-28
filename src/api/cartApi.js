import axiosInstance from "./axiosInstance";

export async function getCartItemsApi() {
    const res = await axiosInstance.get("/Carts");
    const data = res.data;

    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    if (data && data.response && Array.isArray(data.response.items)) return data.response.items;

    return [];
}

export async function addToCartApi(productId, count) {
    const res = await axiosInstance.post("/Carts", {
        ProductId: productId,
        Count: count || 1,
    });
    return res.data;
}

export async function updateCartQuantityApi(productId, count) {
    const res = await axiosInstance.patch("/Carts/" + productId, {
        Count: count,
    });
    return res.data;
}

export async function removeFromCartApi(productId) {
    const res = await axiosInstance.delete("/Carts/" + productId);
    return res.data;
}

export async function clearCartApi() {
    const res = await axiosInstance.delete("/Carts/clear");
    return res.data;
}