import axiosInstance from "./axiosInstance";

export async function addReviewApi(productId, { rating, comment }) {
  const payload = {
    Rating: rating,
    Comment: comment,
  };

  const res = await axiosInstance.post(`/Products/${productId}/reviews`, payload);
  return res.data;
}
