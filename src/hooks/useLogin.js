import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";

export default function useLogin() {
  return useMutation({
    mutationFn: loginApi,
  });
}
