import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
