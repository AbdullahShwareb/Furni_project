import useCartPage from "../../hooks/useCartPage";
import CartView from "./CartView";

export default function Cart() {
  const cart = useCartPage();

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
    />
  );
}
