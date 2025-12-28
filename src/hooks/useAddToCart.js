import { useState } from "react";
import { addToCartApi, getCartItemsApi } from "../api/cartApi";

export default function useAddToCart() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const addToCart = async(productId, quantity = 1) => {
        setLoading(true);
        setError("");

        try {
            await addToCartApi(productId, quantity);
            const items = await getCartItemsApi();
            return items;
        } catch (e) {
            const msg =
                (e && e.response && e.response.data && e.response.data.message) ||
                (e && e.response && e.response.data) ||
                (e && e.message) ||
                "Error";

            setError(typeof msg === "string" ? msg : "Request failed");
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { addToCart, loading, error };
}