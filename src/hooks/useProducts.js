import { useQuery } from "@tanstack/react-query";
import { fetchProductsApi } from "../api/productsApi";

export const useProducts = (lang = "en") => {
    return useQuery({
        queryKey: ["products", lang],
        queryFn: () => fetchProductsApi({ lang }),
        staleTime: 60 * 1000,
    });
};