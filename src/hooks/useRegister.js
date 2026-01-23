import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/authApi";

export default function useRegister() {
  return useMutation({
    mutationFn: registerApi,
  });
}
