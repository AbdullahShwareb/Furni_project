import { useState } from "react";
import { checkoutApi } from "../api/checkoutApi";

export default function useCheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit() {
    try {
      setLoading(true);
      setMsg("");
      await checkoutApi(paymentMethod);
      setMsg("Order placed successfully");
    } catch (e) {
  console.error(e); 
  setMsg(e?.response?.data?.message || "Checkout failed");
}
 finally {
      setLoading(false);
    }
  }

  return {
    paymentMethod,
    setPaymentMethod,
    loading,
    msg,
    submit,
  };
}
