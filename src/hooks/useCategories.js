import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesApi } from "../api/categoriesApi";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesApi,
    staleTime: 60 * 1000,
  });
}
