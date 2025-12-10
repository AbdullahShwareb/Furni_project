import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/MainLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";

import Home from "./pages/home/Home.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";

import Shop from "./pages/shop/Shop.jsx";
import About from "./pages/about/About.jsx";
import Services from "./pages/services/Services.jsx";
import Blog from "./pages/blog/Blog.jsx";
import Contact from "./pages/contact/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },   
      { path: "home", element: <Home /> }, 
      { path: "shop", element: <Shop /> }, 
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> }, 
      { path: "blog", element: <Blog /> },  
      { path: "contact", element: <Contact /> }, 
      { path: "cart", element: <Cart /> }, 
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },      
      { path: "register", element: <Register /> }, 
    ],
  },
]);

export default router;
