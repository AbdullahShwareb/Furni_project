import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../api/authApi";

export default function useResetPassword() {
    return useMutation({
        mutationFn: resetPasswordApi,
    });
}