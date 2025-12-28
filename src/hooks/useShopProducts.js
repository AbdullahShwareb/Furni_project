import { useEffect, useMemo, useState } from "react";
import { getProductsApi } from "../api/productsApi";

export default function useShopProducts() {
    const [all, setAll] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortDir, setSortDir] = useState("asc");

    const [page, setPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        async function load() {
            try {
                const list = await getProductsApi();
                setAll(Array.isArray(list) ? list : []);
            } catch {
                setErr("Failed to load products");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const categories = useMemo(() => {
        const map = new Map();

        for (const p of all) {
            const cid =
                p.categoryId !== undefined && p.categoryId !== null ?
                p.categoryId :
                p.category && p.category.id;

            const cname =
                p.categoryName ?
                p.categoryName :
                p.category && p.category.name ?
                p.category.name :
                "";

            if (cid != null) map.set(String(cid), cname || `Category ${cid}`);
        }

        return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
    }, [all]);

    const filteredSorted = useMemo(() => {
        let list = all.slice();
        const q = search.toLowerCase();

        if (q) {
            list = list.filter((p) => {
                const name = String(
                    p.name ? p.name : p.productName ? p.productName : ""
                ).toLowerCase();
                return name.includes(q);
            });
        }

        if (categoryId !== "all") {
            list = list.filter((p) => {
                const cid =
                    p.categoryId !== undefined ?
                    p.categoryId :
                    p.category && p.category.id;
                return String(cid) === String(categoryId);
            });
        }

        list = list.filter((p) => {
            const price = Number(
                p.price !== undefined ?
                p.price :
                p.Price !== undefined ?
                p.Price :
                0
            );

            if (minPrice && price < Number(minPrice)) return false;
            if (maxPrice && price > Number(maxPrice)) return false;
            return true;
        });

        list.sort((a, b) => {
            const dir = sortDir === "asc" ? 1 : -1;

            if (sortBy === "price") {
                return (Number(a.price) - Number(b.price)) * dir;
            }

            if (sortBy === "rate") {
                const ra =
                    a.rate !== undefined ? a.rate : a.rating !== undefined ? a.rating : 0;
                const rb =
                    b.rate !== undefined ? b.rate : b.rating !== undefined ? b.rating : 0;
                return (ra - rb) * dir;
            }

            return String(a.name).localeCompare(String(b.name)) * dir;
        });

        return list;
    }, [all, search, categoryId, minPrice, maxPrice, sortBy, sortDir]);

    const total = filteredSorted.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    useEffect(() => {
        setPage(1);
    }, [search, categoryId, minPrice, maxPrice, sortBy, sortDir]);

    const pageItems = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredSorted.slice(start, start + pageSize);
    }, [filteredSorted, page]);

    return {
        loading,
        err,
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
        go: setPage,
    };
}