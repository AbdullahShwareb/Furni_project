import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getProductsApi } from "../api/productsApi";

export default function useShopProducts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const PAGE_SIZE = 6;

  const {
    data: allItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () =>
      categoryId === "all"
        ? getProductsApi({ limit: 1000 })
        : getProductsApi({ categoryId }),
    staleTime: 60 * 1000,
  });

  const filtered = useMemo(() => {
    let list = allItems.slice();

    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter((p) => {
        const name = (p && (p.name || p.productName || "")) || "";
        return name.toLowerCase().includes(q);
      });
    }

    if (categoryId !== "all") {
      list = list.filter(
        (p) => String(p && p.categoryId) === String(categoryId)
      );
    }

    if (minPrice !== "") {
      const min = Number(minPrice);
      list = list.filter((p) => Number((p && p.price) || 0) >= min);
    }

    if (maxPrice !== "") {
      const max = Number(maxPrice);
      list = list.filter((p) => Number((p && p.price) || 0) <= max);
    }

    list.sort((a, b) => {
      const aVal = a ? a[sortBy] : undefined;
      const bVal = b ? b[sortBy] : undefined;

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const av = typeof aVal === "string" ? aVal.toLowerCase() : aVal;
      const bv = typeof bVal === "string" ? bVal.toLowerCase() : bVal;

      if (sortDir === "asc") return av > bv ? 1 : av < bv ? -1 : 0;
      return av < bv ? 1 : av > bv ? -1 : 0;
    });

    return list;
  }, [allItems, search, categoryId, minPrice, maxPrice, sortBy, sortDir]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page, totalPages]);

  const go = (p) => {
    const next = Number(p);
    if (Number.isNaN(next)) return;
    if (next < 1 || next > totalPages) return;
    setPage(next);
  };

  return {
    loading: isLoading,
    err: error ? error.message : "",
    pageItems,
    total,
    totalPages,
    page,
    search,
    categoryId,
    minPrice,
    maxPrice,
    sortBy,
    sortDir,
    setSearch,
    setCategoryId,
    setMinPrice,
    setMaxPrice,
    setSortBy,
    setSortDir,
    go,
  };
}
