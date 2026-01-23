import axiosInstance from "./axiosInstance";

export async function checkoutApi(paymentMethod, customerInfo = {}) {
  const payload = {
    PaymentMethod: paymentMethod,
    ...customerInfo,
  };

  const res = await axiosInstance.post("/Checkouts", payload);
  return res.data;
}
