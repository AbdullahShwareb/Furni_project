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
import useLogin from "../../hooks/useLogin";

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loginForm = (values) => {
    setServerError("");
    setSuccessMsg("");

    const payload = {
      email: values.email.trim(),
      password: values.password,
    };

    loginMutation.mutate(payload, {
      onSuccess: (data) => {
        const token =
          data?.token ||
          data?.data?.token ||
          data?.accessToken ||
          data?.response?.token;

        if (token) {
          localStorage.setItem("token", token);
        }

        const userName =
          data?.user?.fullName ||
          data?.user?.userName ||
          data?.user?.email ||
          payload.email;

        localStorage.setItem("userName", userName);

        setSuccessMsg("تم تسجيل الدخول");

        setTimeout(() => {
          navigate("/home");
        }, 700);
      },

      onError: (err) => {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "فشل تسجيل الدخول";
        setServerError(msg);
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f2",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(loginForm)}
        sx={{ width: 420, bgcolor: "#fff", p: 4, borderRadius: 2 }}
      >
        <Typography variant="h4" sx={{ mb: 3, color: "#3b5d50" }}>
          Login
        </Typography>

        {serverError && <Alert severity="error">{serverError}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}

        <TextField
          label="Email"
          fullWidth
          sx={{ mt: 2 }}
          {...register("email", { required: "Email required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          {...register("password", { required: "Password required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 3,
            bgcolor: "#3b5d50",
            "&:hover": { bgcolor: "#2d463d" },
          }}
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Login"
          )}
        </Button>

        <Typography sx={{ mt: 2, textAlign: "center" }}>
          ما عندك حساب؟{" "}
          <Link to="/auth/register" style={{ color: "#3b5d50" }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
