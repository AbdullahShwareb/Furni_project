import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSendCode from "../../hooks/useSendCode";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");

  const navigate = useNavigate();
  const sendCodeMutation = useSendCode();

  const handleSendCode = (e) => {
    e.preventDefault();

    setLocalError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setLocalError("اكتب الإيميل أولا");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setLocalError("صيغة الإيميل غير صحيحة");
      return;
    }

    sendCodeMutation.mutate(trimmedEmail, {
      onSuccess: () => {
        setTimeout(() => {
          navigate("/auth/reset-password", { state: { email: trimmedEmail } });
        }, 800);
      },
    });
  };

  const apiMessage =
    sendCodeMutation.error?.response?.data?.message ||
    sendCodeMutation.error?.response?.data?.error ||
    sendCodeMutation.error?.response?.data?.msg;

  const status = sendCodeMutation.error?.response?.status;

  const serverError =
    localError ||
    (sendCodeMutation.isError &&
      (status === 400
        ? apiMessage || "البيانات غير صحيحة. تأكد من الإيميل"
        : status === 404
        ? "الرابط غير صحيح (404)"      
        : apiMessage || "فشل إرسال الكود. تأكد من الإيميل"));

  const successMsg =
    sendCodeMutation.data?.message ||
    sendCodeMutation.data?.msg ||
    (sendCodeMutation.isSuccess ? "تم إرسال الكود إلى الإيميل" : "");

  const isSubmitting = sendCodeMutation.isPending;

  return (
    <Box sx={{ backgroundColor: "#f0f4f2", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: 1,
              color: "#3b5d50",
            }}
          >
            Forgot Password
          </Typography>

          <Typography sx={{ textAlign: "center", mb: 3, color: "#666" }}>
            اكتب إيميلك وبنبعتلك كود لاسترجاع كلمة المرور
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {serverError}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMsg}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSendCode}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 1,
                backgroundColor: "#3b5d50",
                "&:hover": { backgroundColor: "#2d463d" },
              }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Send Code"}
            </Button>

            <Typography sx={{ textAlign: "center", mt: 1 }}>
              <Link
                to="/auth/login"
                style={{ color: "#3b5d50", fontWeight: 600 }}
              >
                Back to Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
