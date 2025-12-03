import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/MainLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";

import Home from "./pages/home/Home.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",               
    element: <MainLayout />,
    children: [
      {
        path: "home",        
        element: <Home />,
      },
      {
        path: "cart",        
        element: <Cart />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
