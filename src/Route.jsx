import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/MainLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";

import Home from "./pages/home/Home.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";

import Shop from "./pages/shop/Shop.jsx";
import About from "./pages/about/About.jsx";
import Services from "./pages/services/services.jsx";
import Blog from "./pages/blog/Blog.jsx";
import Contact from "./pages/contact/Contact.jsx";

import Categories from "./components/Categories/Categories.jsx";

import ForgotPassword from "./pages/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";

import ProductDetails from "./pages/products/ProductDetails.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Checkout from "./pages/checkout/Checkout.jsx"; 
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },

      { path: "categories", element: <Categories /> },
      { path: "shop", element: <Shop /> },
      { path: "products/:id", element: <ProductDetails /> },

      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },

      { path: "cart", element: <Cart /> },
      { path: "profile", element: <Profile /> },

      { path: "checkout", element: <Checkout /> },

      { path: "*", element: <div style={{ padding: 20 }}>404 - Page not found</div> },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "*", element: <div style={{ padding: 20 }}>404 - Page not found</div> },
    ],
  },
]);

export default router;
