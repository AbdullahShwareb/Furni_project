import { useQuery } from "@tanstack/react-query";
import { getProductDetailsApi } from "../api/productsApi";

export default function useProductDetails(id) {
  return useQuery({
    queryKey: ["product", id],
    enabled: !!id, 

    queryFn: async () => {
      const raw = await getProductDetailsApi(id);

      if (raw && raw.response) return raw.response;
      if (raw && raw.data) return raw.data;

      return raw;
    },
  });
}
