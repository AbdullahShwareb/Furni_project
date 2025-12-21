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
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialEmail = useMemo(() => location.state?.email || "", [location.state]);

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setServerError("");

    const trimmedEmail = email.trim();
    const trimmedCode = code.trim();
    const trimmedPassword = newPassword;

    if (!trimmedEmail) {
      setServerError("اكتب الإيميل أولاً ");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setServerError("صيغة الإيميل غير صحيحة ");
      return;
    }

    if (!trimmedCode) {
      setServerError("اكتب الكود اللي وصلك ");
      return;
    }

    if (trimmedPassword.length < 6) {
      setServerError("كلمة المرور لازم تكون 6 أحرف على الأقل ");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.patch(
        "https://knowledgeshop.runasp.net/api/Auth/Account/ResetPassword",
        {
          email: trimmedEmail,
          code: trimmedCode,
          newPassword: trimmedPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const msg =
        res?.data?.message ||
        res?.data?.msg ||
        "تم تغيير كلمة المرور ";

      setSuccessMsg(msg);

      setTimeout(() => navigate("/auth/login"), 1200);
    } catch (err) {
      console.log("ResetPassword ERROR:", err);
      console.log("STATUS:", err?.response?.status);
      console.log("DATA:", err?.response?.data);

      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.msg;

      if (!err?.response) {
        setServerError(
        );
      } else {
        const status = err.response.status;

        if (status === 400) {
          setServerError(apiMessage || "البيانات غير صحيحة. تأكد من الكود وكلمة المرور ");
        } else {
          setServerError(apiMessage || "فشل تغيير كلمة المرور. تأكد من الكود وكلمة المرور ");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const cameWithoutEmail = !initialEmail;

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
              disabled={isSubmitting}
            />

            <TextField
              label="Code"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={isSubmitting}
            />

            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isSubmitting}
              helperText="يفضل 6 أحرف على الأقل"
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
              {isSubmitting ? <CircularProgress size={24} /> : "Reset Password"}
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
