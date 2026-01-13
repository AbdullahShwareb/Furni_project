import { useQuery } from "@tanstack/react-query";
import { getProductByIdFallback } from "../api/productsApi";

export default function useProductDetails(id) {
    return useQuery({
        queryKey: ["productDetails", id],
        queryFn: () => getProductByIdFallback(id),
        enabled: !!id,
    });
}