import { useQuery } from "@tanstack/react-query";
import { getProductDetailsApi } from "../api/productsApi";

export default function useProductDetails(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductDetailsApi(productId),
    enabled: !!productId,
    staleTime: 60 * 1000,
  });
}
