import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import useCartPage from "../../hooks/useCartPage";
import { checkoutApi } from "../../api/checkoutApi";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useCartPage(); 

  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const subtotal = useMemo(() => {
    return cart.items.reduce((sum, it) => {
      const line =
        Number(it.totalPrice) ||
        (Number(it.price || 0) * Number(it.count || 0));
      return sum + line;
    }, 0);
  }, [cart.items]);

  const shippingCost = 0; 
  const grandTotal = subtotal + shippingCost;

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErrorMsg("");

    if (!name || !phone || !address || !city) {
      setErrorMsg("املأ البيانات الأساسية قبل إكمال الطلب.");
      return;
    }

    if (cart.items.length === 0) {
      setErrorMsg("سلة المشتريات فارغة.");
      return;
    }

    try {
      setSubmitting(true);

      await checkoutApi(paymentMethod, {
        fullName: name,
        email,
        phone,
        address,
        city,
      });

      setMsg("تم إنشاء الطلب بنجاح ");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      console.log(err);
      const apiMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.msg ||
        "فشل إكمال الطلب، حاول مرة أخرى.";
      setErrorMsg(apiMsg);
    } finally {
      setSubmitting(false);
    }
  }

  if (cart.loading) {
    return <p style={{ padding: 30 }}>جارِ تحميل البيانات...</p>;
  }

  if (cart.items.length === 0) {
    return (
      <div style={pageWrapper}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0, marginBottom: 10 }}>Checkout</h2>
          <p style={{ marginBottom: 16 }}>سلة المشتريات فارغة حالياً.</p>
          <Link to="/shop" style={primaryBtn}>
            اذهب للتسوق
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <div style={container}>
        <h1 style={pageTitle}>Checkout</h1>

        <div style={twoCols}>
          <div style={leftCol}>
            <div style={cardStyle}>
              <h2 style={cardTitle}>Billing details</h2>

              {errorMsg && (
                <div style={errorBox}>
                  {errorMsg}
                </div>
              )}

              {msg && (
                <div style={successBox}>
                  {msg}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    style={inputStyle}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اكتب اسمك الكامل"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    style={inputStyle}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Phone *</label>
                  <input
                    style={inputStyle}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xxxxxxxx"
                  />
                </div>

                <div>
                  <label style={labelStyle}>City *</label>
                  <input
                    style={inputStyle}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="المدينة"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Address *</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="العنوان بالتفصيل"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Payment Method</label>

                  <div style={paymentOptions}>
                    <button
                      type="button"
                      style={
                        paymentMethod === "Visa"
                          ? paymentBtnActive
                          : paymentBtn
                      }
                      onClick={() => setPaymentMethod("Visa")}
                    >
                      Visa
                    </button>

                    <button
                      type="button"
                      style={
                        paymentMethod === "MasterCard"
                          ? paymentBtnActive
                          : paymentBtn
                      }
                      onClick={() => setPaymentMethod("MasterCard")}
                    >
                      MasterCard
                    </button>

                    <button
                      type="button"
                      style={
                        paymentMethod === "Cash"
                          ? paymentBtnActive
                          : paymentBtn
                      }
                      onClick={() => setPaymentMethod("Cash")}
                    >
                      Cash on Delivery
                    </button>
                  </div>

                  <p style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>
                    سيتم إرسال الطلب بهذه الطريقة: <strong>{paymentMethod}</strong>
                  </p>
                </div>

                <button
                  type="submit"
                  style={{ ...primaryBtn, marginTop: 10, textAlign: "center" }}
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          <div style={rightCol}>
            <div style={cardStyle}>
              <h2 style={cardTitle}>Order Summary</h2>

              <div style={{ borderTop: "1px solid #eee", marginTop: 10, paddingTop: 10 }}>
                {cart.items.map((item) => {
                  const line =
                    Number(item.totalPrice) ||
                    Number(item.price || 0) * Number(item.count || 0);

                  return (
                    <div
                      key={item.productId}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                        fontSize: 14,
                      }}
                    >
                      <div style={{ maxWidth: "60%" }}>
                        <div style={{ fontWeight: 600 }}>
                          {item.productName || "Product"}
                        </div>
                        <div style={{ opacity: 0.7 }}>
                          Qty: {item.count}
                        </div>
                      </div>

                      <div style={{ fontWeight: 600 }}>
                        {Number(line || 0).toFixed(2)} ₪
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={summaryRow}>
                <span>Subtotal</span>
                <span>{Number(subtotal || 0).toFixed(2)} ₪</span>
              </div>

              <div style={summaryRow}>
                <span>Shipping</span>
                <span>{Number(shippingCost || 0).toFixed(2)} ₪</span>
              </div>

              <div style={{ ...summaryRow, borderTop: "1px solid #eee", marginTop: 8, paddingTop: 10, fontWeight: 700 }}>
                <span>Total</span>
                <span>{Number(grandTotal || 0).toFixed(2)} ₪</span>
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  ...primaryBtn,
                  width: "100%",
                  marginTop: 16,
                  textAlign: "center",
                }}
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Confirm & Place Order"}
              </button>

              <button
                style={{ ...secondaryLinkBtn, width: "100%", marginTop: 10 }}
                onClick={() => navigate("/cart")}
              >
                العودة إلى السلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const pageWrapper = {
  background: "#f3f4f2",
  minHeight: "100vh",
  padding: "50px 0",
};

const container = {
  maxWidth: 1150,
  margin: "0 auto",
  padding: "0 16px",
};

const pageTitle = {
  fontSize: 32,
  fontWeight: 800,
  marginBottom: 26,
};

const twoCols = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
  gap: 24,
};

const leftCol = {};
const rightCol = {};

const cardStyle = {
  background: "#fff",
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  padding: 22,
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
};

const cardTitle = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 0,
  marginBottom: 12,
};

const labelStyle = {
  display: "block",
  marginBottom: 4,
  fontSize: 14,
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #d4d4d4",
  outline: "none",
  fontSize: 14,
  background: "#fafafa",
};

const paymentOptions = {
  display: "flex",
  gap: 10,
  marginTop: 6,
  flexWrap: "wrap",
};

const paymentBtn = {
  padding: "8px 16px",
  borderRadius: 999,
  border: "1px solid #d4d4d4",
  background: "#fff",
  cursor: "pointer",
  fontSize: 13,
};

const paymentBtnActive = {
  ...paymentBtn,
  background: "#111",
  color: "#fff",
  borderColor: "#111",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  fontSize: 14,
};

const primaryBtn = {
  display: "inline-block",
  background: "#111",
  color: "#fff",
  borderRadius: 999,
  padding: "12px 20px",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
};

const secondaryLinkBtn = {
  background: "#fff",
  color: "#111",
  borderRadius: 999,
  padding: "10px 18px",
  fontWeight: 600,
  border: "1px solid #d4d4d4",
  cursor: "pointer",
};

const errorBox = {
  background: "#fff0f0",
  border: "1px solid #ffc2c2",
  color: "#b42318",
  padding: 10,
  borderRadius: 10,
  marginBottom: 10,
  fontSize: 14,
};

const successBox = {
  background: "#ecfdf3",
  border: "1px solid #abefc6",
  color: "#166534",
  padding: 10,
  borderRadius: 10,
  marginBottom: 10,
  fontSize: 14,
};
