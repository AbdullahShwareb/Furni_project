import { useMutation } from "@tanstack/react-query";
import { sendCodeApi } from "../api/authApi";

export default function useSendCode() {
    return useMutation({
        mutationFn: sendCodeApi,
    });
}