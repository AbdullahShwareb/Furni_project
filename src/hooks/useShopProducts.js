import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getProductsApi } from "../api/productsApi";
import { useCategories } from "./useCategories";

export default function useShopProducts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const PAGE_SIZE = 6;

  // =============== Products ===============
  const {
    data: productsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products-shop", categoryId],
    queryFn: () =>
      getProductsApi({
        limit: 1000,
        categoryId: categoryId === "all" ? undefined : categoryId,
      }),
    staleTime: 60 * 1000,
  });

  const allItems = useMemo(
    () => (Array.isArray(productsData) ? productsData : []),
    [productsData]
  );

  // =============== Categories ===============
  const { data: categoriesRaw } = useCategories();

  const categories = useMemo(() => {
    const raw = categoriesRaw ?? [];
    const list = Array.isArray(raw)
      ? raw
      : Array.isArray(raw.response)
      ? raw.response
      : Array.isArray(raw.data)
      ? raw.data
      : [];

    return list.map((c, idx) => ({
      id: c.id ?? c.categoryId ?? c.Id ?? idx,
      name:
        c.name ??
        c.nameEn ??
        c.nameAr ??
        c.title ??
        `Category #${idx + 1}`,
    }));
  }, [categoriesRaw]);

  // =============== Filter + Sort ===============
  const filtered = useMemo(() => {
    let list = allItems.slice();

    // search
    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter((p) => {
        const name = (p && (p.name || p.productName || "")) || "";
        return name.toLowerCase().includes(q);
      });
    }

    // category
    if (categoryId !== "all") {
      list = list.filter(
        (p) => String(p && p.categoryId) === String(categoryId)
      );
    }

    // min price
    if (minPrice !== "") {
      const min = Number(minPrice);
      list = list.filter((p) => Number((p && p.price) || 0) >= min);
    }

    // max price
    if (maxPrice !== "") {
      const max = Number(maxPrice);
      list = list.filter((p) => Number((p && p.price) || 0) <= max);
    }

    // sort
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
  }, [
    allItems,
    search,
    categoryId,
    minPrice,
    maxPrice,
    sortBy,
    sortDir,
  ]);

  // =============== Pagination ===============
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

    categories,
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
