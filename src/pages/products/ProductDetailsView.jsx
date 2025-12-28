export default function ProductDetailsView({
  loading,
  err,
  product,
  onAddToCart,
  onBack,
}) {
  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (err) return <p style={{ padding: 20, color: "red" }}>{err}</p>;
  if (!product) return <p style={{ padding: 20 }}>No product found.</p>;

  const name = product.name ? product.name : product.productName;
  const price = product.price !== undefined ? product.price : (product.Price !== undefined ? product.Price : 0);
  const rate = product.rate !== undefined ? product.rate : (product.rating !== undefined ? product.rating : null);
  const desc = product.description ? product.description : (product.desc ? product.desc : "");

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <button onClick={onBack} style={{ marginBottom: 12 }}>
        ← Back
      </button>

      <div style={{ border: "1px solid #ddd", borderRadius: 14, padding: 18 }}>
        <h2 style={{ marginTop: 0 }}>{name}</h2>

        <p style={{ fontSize: 18, margin: "8px 0" }}>
          Price: <b>{Number(price)} ₪</b>
        </p>

        {rate !== null ? (
          <p style={{ margin: "8px 0" }}>Rate: {rate}</p>
        ) : null}

        {desc ? (
          <p style={{ marginTop: 14, lineHeight: 1.7 }}>{desc}</p>
        ) : null}

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            onClick={onAddToCart}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #3b5d50",
              background: "#3b5d50",
              color: "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
