import { useQuery } from "@tanstack/react-query";
import { fetchProductDetailsApi } from "../api/productsApi";

export const useProductDetails = (id, lang = "en") => {
    return useQuery({
        queryKey: ["productDetails", id, lang],
        queryFn: () => fetchProductDetailsApi({ id, lang }),
        enabled: !!id,
        staleTime: 60 * 1000,
    });
};