import axiosInstance from "./axiosInstance";


// Forgot Password *code*
export const sendCodeApi = async(email) => {
    const res = await axiosInstance.post("/Auth/Account/SendCode", { email });
    return res.data;
};

// Reset Password
export const resetPasswordApi = async({ email, code, newPassword }) => {
    const res = await axiosInstance.patch("/Auth/Account/ResetPassword", {
        email,
        code,
        newPassword,
    });
    return res.data;
};

// Login
export const loginApi = async({ email, password }) => {
    const res = await axiosInstance.post("/Auth/Account/Login", {
        email,
        password,
    });
    return res.data;
};
//register
export const registerApi = async(payload) => {
    const res = await axiosInstance.post("/Auth/Account/Register", payload);
    return res.data;
};