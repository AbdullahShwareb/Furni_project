import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {
  const location = useLocation();

  useEffect(() => {
    const product = location.state?.addProduct;
    if (product) {
      console.log("Add to cart:", product);
    }
  }, [location.state]);

  return <div>Cart Page</div>;
}
