export default function CheckoutView({
  paymentMethod,
  setPaymentMethod,
  loading,
  msg,
  submit,
}) {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Checkout</h2>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="Visa">Visa</option>
        <option value="Cash">Cash</option>
      </select>

      <button onClick={submit} disabled={loading}>
        {loading ? "Processing..." : "Place Order"}
      </button>

      {msg && <p>{msg}</p>}
    </div>
  );
}
