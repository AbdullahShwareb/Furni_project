import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReviewApi } from "../api/reviewsApi";

export default function useAddReview(productId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addReviewApi(productId, data),

    onSuccess: () => {
      queryClient.invalidateQueries(["product", productId]);
    },
  });
}
