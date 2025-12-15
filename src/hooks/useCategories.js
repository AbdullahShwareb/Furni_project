import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export function useCategories() {
    const fetchCategories = async() => {
        const response = await axiosInstance.get("/Categories");
        return response.data;
    };

    const query = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 60 * 1000,
    });

    return query;
}