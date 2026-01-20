import { useMemo } from "react";

function getItemImage(item) {
  return (
    item.imageUrl ||
    item.image ||
    item.img ||
    item.productImage ||
    item.productImg ||
    item.photoUrl ||
    ""
  );
}

export default function CartView({
  loading,
  msg,
  items,
  cartTotal,
  onDec,
  onInc,
  onRemove,
  onClear,
}) {
  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const line =
        Number(it.totalPrice) ||
        (Number(it.price || 0) * Number(it.count || 0));
      return sum + line;
    }, 0);
  }, [items]);

  if (loading) return <p style={{ padding: 20 }}>Loading cart...</p>;

  return (
    <div style={{ background: "#f3f4f2", padding: "50px 0" }}>
      <div style={{ maxWidth: 1150, margin: "0 auto", padding: "0 16px" }}>
        <h2 style={{ margin: 0, marginBottom: 18 }}>Cart</h2>

        {msg ? (
          <div
            style={{
              background: "#fff3f3",
              border: "1px solid #ffd4d4",
              color: "#b42318",
              padding: 12,
              borderRadius: 10,
              marginBottom: 14,
            }}
          >
            {msg}
          </div>
        ) : null}

        {items.length === 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 22,
              border: "1px solid #e7e7e7",
            }}
          >
            Cart is empty
          </div>
        ) : (
          <>
            {/* TABLE */}
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1px solid #e7e7e7",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr 140px 180px 140px 90px",
                  gap: 0,
                  padding: "18px 18px",
                  fontWeight: 700,
                  borderBottom: "1px solid #eaeaea",
                }}
              >
                <div>Image</div>
                <div>Product</div>
                <div>Price</div>
                <div style={{ textAlign: "center" }}>Quantity</div>
                <div>Total</div>
                <div style={{ textAlign: "center" }}>Remove</div>
              </div>

              {items.map((item) => {
                const lineTotal =
                  Number(item.totalPrice) ||
                  Number(item.price || 0) * Number(item.count || 0);

                const img = getItemImage(item);

                return (
                  <div
                    key={item.productId}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "180px 1fr 140px 180px 140px 90px",
                      padding: "18px",
                      alignItems: "center",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {/* Image */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 14,
                          background: "#eef0ee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        {img ? (
                          <img
                            src={img}
                            alt={item.productName}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <span style={{ opacity: 0.5, fontSize: 12 }}>
                            No Image
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product */}
                    <div style={{ fontWeight: 700, fontSize: 18 }}>
                      {item.productName}
                    </div>

                    {/* Price */}
                    <div style={{ fontWeight: 600 }}>
                      {Number(item.price || 0).toFixed(2)} ₪
                    </div>

                    {/* Qty */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <button
                          onClick={() => onDec(item)}
                          style={qtyBtnStyle}
                          aria-label="decrease"
                        >
                          −
                        </button>

                        <div style={qtyBoxStyle}>{item.count}</div>

                        <button
                          onClick={() => onInc(item)}
                          style={qtyBtnStyle}
                          aria-label="increase"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div style={{ fontWeight: 600 }}>
                      {Number(lineTotal || 0).toFixed(2)} ₪
                    </div>

                    {/* Remove */}
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={() => onRemove(item)}
                        style={removeBtnStyle}
                        title="Remove"
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ACTION BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 18,
                flexWrap: "wrap",
              }}
            >
              <button style={pillBtnStyle} onClick={() => window.location.reload()}>
                Update Cart
              </button>

              <button
                style={pillBtnStyle}
                onClick={() => (window.location.href = "/shop")}
              >
                Continue Shopping
              </button>

              <button
                style={{
                  ...pillBtnStyle,
                  background: "#fff",
                  border: "1px solid #e1e1e1",
                }}
                onClick={onClear}
              >
                Clear Cart
              </button>
            </div>

            {/* COUPON + TOTALS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 26,
                marginTop: 28,
              }}
            >
              {/* Coupon */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e7e7e7",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
                  Coupon
                </div>
                <div style={{ opacity: 0.75, marginBottom: 14 }}>
                  Enter your coupon code if you have one.
                </div>

                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <input
                    placeholder="Coupon Code"
                    style={{
                      flex: 1,
                      minWidth: 240,
                      padding: "14px 14px",
                      borderRadius: 12,
                      border: "1px solid #d9d9d9",
                      outline: "none",
                      fontSize: 15,
                    }}
                  />
                  <button style={pillBtnStyle}>Apply Coupon</button>
                </div>
              </div>

              {/* Totals */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e7e7e7",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
                  CART TOTALS
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderTop: "1px solid #eee",
                  }}
                >
                  <div style={{ opacity: 0.8 }}>Subtotal</div>
                  <div style={{ fontWeight: 700 }}>
                    {Number(subtotal || 0).toFixed(2)} ₪
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderTop: "1px solid #eee",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div style={{ opacity: 0.8 }}>Total</div>
                  <div style={{ fontWeight: 700 }}>
                    {Number(cartTotal || 0).toFixed(2)} ₪
                  </div>
                </div>

                <button
                  style={{
                    ...pillBtnStyle,
                    marginTop: 16,
                    width: "100%",
                  }}
                  onClick={() => alert("Checkout later ")}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  width: 34,
  height: 34,
  borderRadius: 10,
  border: "1px solid #cfcfcf",
  background: "#fff",
  cursor: "pointer",
  fontSize: 18,
  lineHeight: "34px",
};

const qtyBoxStyle = {
  width: 50,
  height: 40,
  border: "1px solid #cfcfcf",
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  background: "#fff",
};

const removeBtnStyle = {
  width: 36,
  height: 36,
  borderRadius: 12,
  border: "1px solid #cfcfcf",
  background: "#fff",
  cursor: "pointer",
  fontSize: 18,
};

const pillBtnStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  padding: "14px 22px",
  borderRadius: 999,
  cursor: "pointer",
  fontWeight: 700,
};
