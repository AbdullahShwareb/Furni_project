import axiosInstance from "./axiosInstance";

function normalizeProfile(res) {
  const data = res?.data ?? res;
  return data?.response ?? data;
}

// GET /api/Profile
export async function getProfileApi() {
  const res = await axiosInstance.get("/Profile");
  return normalizeProfile(res);
}

// PATCH /api/Profile/change-email
export async function changeEmailApi({ newEmail }) {
  const body = {
    NewEmail: newEmail, 
  };
  const res = await axiosInstance.patch("/Profile/change-email", body);
  return res.data ?? res;
}

// PATCH /api/Profile/change-password
export async function changePasswordApi(values) {
  const body = {
    CurrentPassword: values.currentPassword,
    NewPassword: values.newPassword,
    ConfirmNewPassword: values.confirmNewPassword,
  };
  const res = await axiosInstance.patch("/Profile/change-password", body);
  return res.data ?? res;
}
