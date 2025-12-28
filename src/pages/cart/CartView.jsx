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
  if (loading) return <p style={{ padding: 20 }}>Loading cart...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2>Cart</h2>

      {msg ? <p style={{ color: "red" }}>{msg}</p> : null}

      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item.productId}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                marginBottom: 10,
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <p style={{ margin: 0 }}>
                  <b>{item.productName}</b>
                </p>
                <p style={{ margin: "8px 0" }}>Count: {item.count}</p>
                <p style={{ margin: "8px 0" }}>Price: {item.price} ₪</p>
                <p style={{ margin: "8px 0" }}>Total: {item.totalPrice} ₪</p>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => onDec(item)}>-</button>
                <button onClick={() => onInc(item)}>+</button>
                <button onClick={() => onRemove(item)}>Remove</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: 18 }}>
              Total: <b>{cartTotal} ₪</b>
            </p>

            <button onClick={onClear} style={{ padding: "8px 12px" }}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
