import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";

export default function ProductDetailsView() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data: product, isLoading, isError } = useProductDetails(id);

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

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <button onClick={() => nav(-1)} style={{ marginBottom: 16 }}>
        ← Back
      </button>

      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>

        {price != null && (
          <div style={{ fontWeight: 700, marginBottom: 10 }}>
            Price: {price}
          </div>
        )}

        {desc && <p style={{ lineHeight: 1.7 }}>{desc}</p>}

        <div style={{ marginTop: 16, opacity: 0.7, fontSize: 14 }}>
          Product ID: {product?.id ?? product?.productId ?? product?.Id}
        </div>
      </div>
    </div>
  );
}
