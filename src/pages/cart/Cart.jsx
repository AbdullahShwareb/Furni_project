import { useNavigate } from "react-router-dom";
import useCartPage from "../../hooks/useCartPage";
import CartView from "./CartView";

export default function Cart() {
  const cart = useCartPage();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <CartView
      loading={cart.loading}
      msg={cart.msg}
      items={cart.items}
      cartTotal={cart.cartTotal}
      onDec={cart.dec}
      onInc={cart.inc}
      onRemove={cart.removeItem}
      onClear={cart.clearAll}
      onCheckout={handleCheckout} 
    />
  );
}
