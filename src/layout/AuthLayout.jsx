import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <h2>Auth Layout</h2>
      <Outlet />
    </>
  );
};

export default AuthLayout;
