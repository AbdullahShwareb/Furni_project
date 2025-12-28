import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetailsApi } from "../../api/productsApi";
import { addToCartApi } from "../../api/cartApi";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const normalizeProduct = (data) => {
    if (data && (data.id || data.productId || data.ProductId)) return data;

    if (data && data.response) return data.response;

    if (data && data.data) return data.data;

    return null;
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setMsg("");
      try {
        const data = await getProductDetailsApi(id);
        const p = normalizeProduct(data);
        setProduct(p);
      } catch (e) {
        void e;
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setMsg("");
    try {
      const productId = product.id || product.productId || product.ProductId;
      await addToCartApi(productId, 1);
      setMsg(" Added to cart");
    } catch (e) {
      void e;
      setMsg(" Add to cart failed");
    }
  };

  if (loading) return <p>Loading details...</p>;
  if (!product) return <p>Product not found</p>;

  const name = product.name || product.productName || product.title || "Product";
  const desc = product.description || product.desc || "";
  const price = product.price || product.Price || "";

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{name}</h2>
      {desc ? <p>{desc}</p> : null}

      <p>
        <b>Price:</b> {price} ₪
      </p>

      <button onClick={handleAddToCart}>ADD TO CART</button>
      <button onClick={() => navigate("/cart")} style={{ marginLeft: 10 }}>
        GO TO CART
      </button>

      {msg ? <p style={{ marginTop: 10 }}>{msg}</p> : null}
    </div>
  );
}
