import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../api/productsApi";

export default function useShopProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProductsApi,
        staleTime: 60 * 1000,
    });
}