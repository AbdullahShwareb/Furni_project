import { useQuery } from "@tanstack/react-query";
import { getProductDetailsApi } from "../api/productsApi";

export default function useProductDetails(id) {
  return useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetailsApi(id),
    enabled: !!id,
  });
}
