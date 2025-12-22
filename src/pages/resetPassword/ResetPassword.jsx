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
import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialEmail = useMemo(
    () => location.state?.email || "",
    [location.state]
  );

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [localError, setLocalError] = useState("");

  const resetMutation = useResetPassword();

  const handleReset = (e) => {
    e.preventDefault();

    setLocalError("");

    const trimmedEmail = email.trim();
    const trimmedCode = code.trim();
    const trimmedPassword = newPassword;

    if (!trimmedEmail) return setLocalError("اكتب الإيميل أولاً");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) return setLocalError("صيغة الإيميل غير صحيحة");

    if (!trimmedCode) return setLocalError("اكتب الكود اللي وصلك");
    if (trimmedPassword.length < 6) return setLocalError("كلمة المرور لازم تكون 6 أحرف على الأقل");

    resetMutation.mutate(
      { email: trimmedEmail, code: trimmedCode, newPassword: trimmedPassword },
      {
        onSuccess: () => {
          setTimeout(() => navigate("/auth/login"), 1200);
        },
      }
    );
  };

  const cameWithoutEmail = !initialEmail;

  const apiMessage =
    resetMutation.error?.response?.data?.message ||
    resetMutation.error?.response?.data?.error ||
    resetMutation.error?.response?.data?.msg;

  const status = resetMutation.error?.response?.status;

  const serverError =
    localError ||
    (resetMutation.isError &&
      (status === 400
        ? apiMessage || "البيانات غير صحيحة. تأكد من الكود وكلمة المرور"
        : apiMessage || "فشل تغيير كلمة المرور. تأكد من الكود وكلمة المرور"));

  const successMsg =
    resetMutation.data?.message ||
    resetMutation.data?.msg ||
    (resetMutation.isSuccess ? "تم تغيير كلمة المرور" : "");

  return (
    <Box sx={{ backgroundColor: "#f0f4f2", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 1, color: "#3b5d50" }}
          >
            Reset Password
          </Typography>

          <Typography sx={{ textAlign: "center", mb: 3, color: "#666" }}>
            اكتب الإيميل + الكود اللي وصلك + كلمة المرور الجديدة
          </Typography>

          {cameWithoutEmail && (
            <Alert severity="info" sx={{ mb: 2 }}>
              لو وصلت لهون بدون إيميل، اكتب الإيميل اللي استعملته في “Forgot Password”
            </Alert>
          )}

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
            onSubmit={handleReset}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={resetMutation.isPending}
            />

            <TextField
              label="Code"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={resetMutation.isPending}
            />

            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={resetMutation.isPending}
              helperText="يفضل 6 أحرف على الأقل"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={resetMutation.isPending}
              sx={{
                mt: 1,
                backgroundColor: "#3b5d50",
                "&:hover": { backgroundColor: "#2d463d" },
              }}
            >
              {resetMutation.isPending ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>

            <Typography sx={{ textAlign: "center", mt: 1 }}>
              <Link to="/auth/login" style={{ color: "#3b5d50", fontWeight: 600 }}>
                Back to Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
