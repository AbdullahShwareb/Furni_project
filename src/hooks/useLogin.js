import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";

function extractUserAndToken(raw) {
  const root = raw?.response || raw;   

  const token =
    root?.token ||
    root?.accessToken ||
    root?.jwt ||
    root?.access_token;

  const u = root?.user || root?.userDto || root;

  const user = {
    fullName: u?.fullName || u?.name || "",
    userName: u?.userName || u?.username || "",
    email: u?.email || "",
  };

  return { token, user };
}

export default function useLogin() {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const { token, user } = extractUserAndToken(data);

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        const display =
          user.fullName ||
          user.userName ||
          user.email ||
          "";

        if (display) {
          localStorage.setItem("userName", display);
        }
      }
    },
  });
}
