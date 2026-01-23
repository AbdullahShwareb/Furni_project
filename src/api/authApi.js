import axiosInstance from "./axiosInstance";

// Login
export const loginApi = async ({ email, password }) => {
  const res = await axiosInstance.post("/auth/Account/Login", {
    email,
    password,
  });
  return res.data;
};

//  Register  
export const registerApi = async (payload) => {
  const res = await axiosInstance.post("/auth/Account/Register", payload);
  return res.data;
};

//  Forgot Password - Send Code
export const sendCodeApi = async (emailOrPayload) => {
  const payload =
    typeof emailOrPayload === "string"
      ? { email: emailOrPayload }
      : emailOrPayload;

  const res = await axiosInstance.post("/auth/Account/SendCode", payload);
  return res.data;
};

//  Reset Password
export const resetPasswordApi = async ({ email, code, newPassword }) => {
  const res = await axiosInstance.patch("/auth/Account/ResetPassword", {
    email,
    code,
    newPassword,
  });
  return res.data;
};

//  Refresh Token 
export const refreshTokenApi = async () => {
  const res = await axiosInstance.post("/auth/Account/RefreshToken");
  return res.data;
};
