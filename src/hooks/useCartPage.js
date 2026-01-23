import { useEffect, useState } from "react";
import {
  clearCartApi,
  getCartItemsApi,
  removeFromCartApi,
  updateCartQuantityApi,
} from "../api/cartApi";
import { getProductsApi } from "../api/productsApi";

function getPriceFromCartItem(it = {}) {
  return (
    it.price ??
    it.Price ??
    it.unitPrice ??
    it.unitprice ??
    it.productPrice ??
    it.ProductPrice ??
    it.sellingPrice ??
    it.SellingPrice ??
    0
  );
}

function getPriceFromProduct(prod = {}) {
  return (
    prod.price ??
    prod.Price ??
    prod.unitPrice ??
    prod.unitprice ??
    prod.productPrice ??
    prod.ProductPrice ??
    prod.sellingPrice ??
    prod.SellingPrice ??
    prod.priceAfterDiscount ??
    prod.discountedPrice ??
    0
  );
}

export default function useCartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    setMsg("");

    try {
      const [cartRaw, productsRaw] = await Promise.all([
        getCartItemsApi(),
        getProductsApi({ limit: 1000 }),
      ]);

      const products = Array.isArray(productsRaw)
        ? productsRaw
        : Array.isArray(productsRaw?.data)
        ? productsRaw.data
        : Array.isArray(productsRaw?.response)
        ? productsRaw.response
        : [];

      let cartItems = [];
      if (Array.isArray(cartRaw)) cartItems = cartRaw;
      else if (cartRaw && Array.isArray(cartRaw.items)) cartItems = cartRaw.items;

      const productMap = new Map();
      (products || []).forEach((p) => {
        const id = p?.id ?? p?.productId ?? p?.ProductId;
        if (!id) return;
        productMap.set(String(id), p);
      });

      const enriched = (cartItems || []).map((it) => {
        const pid =
          it.productId ?? it.ProductId ?? it.productID ?? it.id ?? null;

        const prod = pid ? productMap.get(String(pid)) || {} : {};

        const imageUrl =
          it.imageUrl ||
          prod.imageUrl ||
          prod.image ||
          prod.img ||
          prod.productImage ||
          prod.productImg ||
          prod.photoUrl ||
          "";

        const productName =
          it.productName ||
          prod.name ||
          prod.title ||
          prod.productName ||
          `Product #${pid ?? ""}`;

        const priceFromItem = getPriceFromCartItem(it);
        const priceFromProduct = getPriceFromProduct(prod);

        const price = priceFromItem || priceFromProduct || 0;

        const count = it.count ?? it.qty ?? it.quantity ?? 1;

        const totalPrice =
          it.totalPrice ||
          it.TotalPrice ||
          Number(price || 0) * Number(count || 0);

        return {
          ...it,
          productId: pid,
          productName,
          price,
          count,
          totalPrice,
          imageUrl,
        };
      });

      setItems(enriched);
    } catch (e) {
      console.log("cart load error", e);
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
      await updateCartQuantityApi(item.productId, (item.count || 0) + 1);
      await load();
    } catch (e) {
      console.log(e);
      setMsg("Failed to update quantity");
    }
  }

  async function dec(item) {
    try {
      const next = (item.count || 0) - 1;
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
