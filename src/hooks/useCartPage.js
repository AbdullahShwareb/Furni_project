import { useEffect, useState } from "react";
import {
  clearCartApi,
  getCartItemsApi,
  removeFromCartApi,
  updateCartQuantityApi,
} from "../api/cartApi";
import { getProductsApi } from "../api/productsApi";

export default function useCartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    setMsg("");

    try {
      const [cartRaw, products] = await Promise.all([
        getCartItemsApi(),
        getProductsApi({ limit: 1000 }),
      ]);

      let cartItems = [];
      if (Array.isArray(cartRaw)) cartItems = cartRaw;
      else if (cartRaw && Array.isArray(cartRaw.items)) cartItems = cartRaw.items;

      const productMap = new Map();
      (products || []).forEach((p) => {
        const id = p.id || p.productId || p.ProductId;
        if (!id) return;
        productMap.set(id, p);
      });

      const enriched = cartItems.map((it) => {
        const prod = productMap.get(it.productId) || {};
        const imageUrl =
          prod.image ||
          prod.imageUrl ||
          prod.img ||
          prod.productImage ||
          prod.productImg ||
          prod.photoUrl ||
          "";

        return {
          ...it,
          productName: prod.name || prod.productName || it.productName,
          price: prod.price ?? it.price,
          imageUrl,
        };
      });

      setItems(enriched);
    } catch (e) {
      console.log(e);
      setItems([]);
      setMsg("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function inc(item) {
    try {
      await updateCartQuantityApi(item.productId, item.count + 1);
      await load();
    } catch (e) {
      console.log(e);
      setMsg("Failed to update quantity");
    }
  }

  async function dec(item) {
    try {
      const next = item.count - 1;
      if (next <= 0) {
        await removeFromCartApi(item.productId);
      } else {
        await updateCartQuantityApi(item.productId, next);
      }
      await load();
    } catch (e) {
      console.log(e);
      setMsg("Failed to update quantity");
    }
  }

  async function removeItem(item) {
    try {
      await removeFromCartApi(item.productId);
      await load();
    } catch (e) {
      console.log(e);
      setMsg("Failed to remove item");
    }
  }

  async function clearAll() {
    try {
      await clearCartApi();
      await load();
      setMsg("Cart cleared");
    } catch (e) {
      console.log(e);
      setMsg("Failed to clear cart");
    }
  }

  const cartTotal = items.reduce((sum, it) => {
    const line =
      Number(it.totalPrice) ||
      Number(it.price || 0) * Number(it.count || 0);
    return sum + line;
  }, 0);

  return {
    items,
    loading,
    msg,
    cartTotal,
    reload: load,
    inc,
    dec,
    removeItem,
    clearAll,
  };
}
