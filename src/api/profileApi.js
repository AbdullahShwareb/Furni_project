import axiosInstance from "./axiosInstance";

export async function getProfileApi() {
  const res = await axiosInstance.get("/Profile");
  return res.data?.response || res.data;
}

export async function updateProfileApi(payload) {
  const res = await axiosInstance.patch("/Profile", payload);
  return res.data?.response || res.data;
}

export async function updateEmailApi(payload) {
  const res = await axiosInstance.patch("/Profile/update-email", payload);
  return res.data?.response || res.data;
}

export async function changePasswordApi(payload) {
  const res = await axiosInstance.patch("/Profile/change-password", payload);
  return res.data?.response || res.data;
}
