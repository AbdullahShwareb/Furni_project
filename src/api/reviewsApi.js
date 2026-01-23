// src/api/reviewsApi.js
import axiosInstance from "./axiosInstance";

// POST /Reviews (أو /Reviews/Add حسب البوستمان)
export async function addReviewApi(payload) {
  const res = await axiosInstance.post("/Reviews", payload);
  return res.data?.response || res.data;
}
