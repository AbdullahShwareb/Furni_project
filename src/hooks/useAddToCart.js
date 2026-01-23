import { useState } from "react";
import { addToCartApi } from "../api/cartApi";

export default function useAddToCart(productId) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function add(count = 1) {
    if (!productId) return;
    setLoading(true);
    setMsg("");

    try {
      await addToCartApi(productId, count);
      setMsg(" تم إضافة المنتج إلى السلة");
    } catch (e) {
      console.error(e);
      setMsg(" حدث خطأ أثناء الإضافة إلى السلة");
    } finally {
      setLoading(false);
    }
  }

  return {
    add,
    loading,
    msg,
    setMsg,
  };
}
