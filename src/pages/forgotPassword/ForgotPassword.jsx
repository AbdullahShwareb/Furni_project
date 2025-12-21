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
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setServerError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setServerError("اكتب الإيميل أولا");
      return;
    }

    // (Optional) simple email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setServerError("صيغة الإيميل غير صحيحة ");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/SendCode",
        { email: trimmedEmail },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const msg =
        res?.data?.message ||
        res?.data?.msg ||
        "تم إرسال الكود إلى الإيميل ";

      setSuccessMsg(msg);

      setTimeout(() => {
        navigate("/auth/reset-password", { state: { email: trimmedEmail } });
      }, 800);
    } catch (err) {
      console.log("SendCode ERROR:", err);
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
          setServerError(apiMessage || "البيانات غير صحيحة. تأكد من الإيميل ");
        } else if (status === 404) {
          setServerError("الرابط غير صحيح (404) ");
        } else if (status === 401) {
          setServerError("غير مصرح (401) ");
        } else if (status === 500) {
          setServerError("مشكلة بالسيرفر (500)  جرّب لاحقًا");
        } else {
          setServerError(apiMessage || "فشل إرسال الكود. تأكد من الإيميل ");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
