import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";
import { addToCartApi } from "../../api/cartApi";

function Stars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <span style={{ letterSpacing: 2 }}>
      {"★".repeat(Math.round(v))}
      {"☆".repeat(5 - Math.round(v))}
    </span>
  );
}

export default function ProductDetailsView() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data: product, isLoading, isError } = useProductDetails(id);

  const [msg, setMsg] = useState("");
  const [adding, setAdding] = useState(false);

  if (isLoading) return <div style={{ padding: 16 }}>Loading details...</div>;
  if (isError) return <div style={{ padding: 16, color: "red" }}>Error loading product.</div>;

  if (!product) {
    return (
      <div style={{ padding: 16 }}>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>Product not found</div>
        <button onClick={() => nav("/shop")}>Back to shop</button>
      </div>
    );
  }

  const productId = product?.id ?? product?.productId ?? product?.ProductId ?? product?.Id;

  const title =
    product?.name ??
    product?.title ??
    product?.Translations?.find((t) => t?.language === "en")?.name ??
    product?.Translations?.[0]?.name ??
    "Product";

  const desc =
    product?.description ??
    product?.Translations?.find((t) => t?.language === "en")?.description ??
    product?.Translations?.[0]?.description ??
    "";

  const price = product?.price ?? product?.Price;

  //  reviews normalization
  const reviews =
    (Array.isArray(product?.reviews) && product.reviews) ||
    (Array.isArray(product?.Reviews) && product.Reviews) ||
    (Array.isArray(product?.response?.reviews) && product.response.reviews) ||
    [];

  const avgRate =
    product?.rate ??
    product?.rating ??
    (reviews.length
      ? reviews.reduce((a, r) => a + (Number(r?.rating) || 0), 0) / reviews.length
      : 0);

  const handleAddToCart = async () => {
    if (!productId) return;

    setMsg("");
    setAdding(true);
    try {
      await addToCartApi(productId, 1);
      setMsg(" Added to cart");
    } catch (e) {
      void e;
      setMsg(" Add to cart failed");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <button onClick={() => nav(-1)} style={{ marginBottom: 16 }}>
        ← Back
      </button>

      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>

        {price != null && (
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Price: {price} ₪</div>
        )}

        <div style={{ marginBottom: 12, color: "#444" }}>
          <Stars value={avgRate} />{" "}
          <span style={{ opacity: 0.7, marginLeft: 8 }}>
            ({reviews.length} reviews)
          </span>
        </div>

        {desc && <p style={{ lineHeight: 1.7 }}>{desc}</p>}

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button onClick={handleAddToCart} disabled={adding}>
            {adding ? "Adding..." : "ADD TO CART"}
          </button>
          <button onClick={() => nav("/cart")}>GO TO CART</button>
        </div>

        {msg ? <p style={{ marginTop: 10 }}>{msg}</p> : null}

        {/* Reviews section */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #eee" }}>
          <h3 style={{ margin: 0, marginBottom: 12 }}>Reviews</h3>

          {reviews.length === 0 ? (
            <div style={{ opacity: 0.7 }}>No reviews yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {reviews.map((r, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: 10,
                    padding: 12,
                    background: "#fafafa",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontWeight: 700 }}>
                      {r?.userName || r?.user || r?.email || "User"}
                    </div>
                    <div style={{ color: "#333" }}>
                      <Stars value={r?.rating} />
                    </div>
                  </div>

                  {r?.comment ? (
                    <div style={{ marginTop: 8, color: "#555", lineHeight: 1.6 }}>
                      {r.comment}
                    </div>
                  ) : null}

                  {r?.createdAt ? (
                    <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 16, opacity: 0.7, fontSize: 14 }}>
          Product ID: {productId}
        </div>
      </div>
    </div>
  );
}
