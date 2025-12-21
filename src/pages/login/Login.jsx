import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loginForm = async (values) => {
    setIsSubmitting(true);
    setServerError("");
    setSuccessMsg("");

    const payload = {
      email: values.email?.trim(),
      password: values.password,
    };

    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/Login",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const token =
        response?.data?.token ||
        response?.data?.data?.token ||
        response?.data?.accessToken;

      if (token) {
        localStorage.setItem("token", token);
      }

      setSuccessMsg("تم تسجيل الدخول ");

      setTimeout(() => {
        navigate("/home"); 
      }, 700);
    } catch (err) {
      console.log("login error:", err);
      console.log("server response:", err.response?.data);

      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.msg;

      if (!err?.response) {
        setServerError();
      } else if (err.response.status === 400) {
        setServerError(apiMessage || "بيانات الدخول غير صحيحة ");
      } else if (err.response.status === 401) {
        setServerError("الإيميل أو كلمة المرور غلط ");
      } else {
        setServerError(apiMessage || "فشل تسجيل الدخول ");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      className="login-form"
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f4f2",
        px: 2,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#3b5d50" }}>
        Login Page
      </Typography>

      <Box
        onSubmit={handleSubmit(loginForm)}
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
          width: "100%",
          maxWidth: 420,
        }}
      >
        {serverError && <Alert severity="error">{serverError}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}

        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
          {...register("email", {
            required: "الإيميل مطلوب",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "صيغة الإيميل غير صحيحة",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
          {...register("password", {
            required: "كلمة المرور مطلوبة",
            minLength: { value: 6, message: "كلمة المرور قصيرة" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Typography sx={{ textAlign: "right", mt: -1 }}>
          <Link
            to="/auth/forgot-password"
            style={{ color: "#3b5d50", fontWeight: 600, textDecoration: "none" }}
          >
            نسيت كلمة المرور؟
          </Link>
        </Typography>

        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          sx={{
            backgroundColor: "#3b5d50",
            "&:hover": { backgroundColor: "#2d463d" },
            py: 1.2,
          }}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Login"}
        </Button>

        <Typography sx={{ textAlign: "center", mt: 1 }}>
          ما عندك حساب؟{" "}
          <Link
            to="/auth/register"
            style={{ color: "#3b5d50", fontWeight: 700, textDecoration: "none" }}
          >
            سجل الآن
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
