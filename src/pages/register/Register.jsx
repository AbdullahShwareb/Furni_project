import { Box, Button, TextField, Typography, CircularProgress, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useRegister from "../../hooks/useRegister";

const registerSchema = yup.object({
  fullName: yup.string().required("Full Name Is Required"),
  email: yup.string().email("Invalid Email Format").required("Email Is Required"),
  userName: yup
    .string()
    .matches(/^[a-zA-Z0-9-_]+$/, "Invalid UserName")
    .min(4, "username must be at least 4 characters")
    .required("UserName Is Required"),
  phoneNumber: yup.string().required("PhoneNumber Is Required"),
  password: yup
    .string()
    .required("Password Is Required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character"),
});

export default function Register() {
  const [serverErrors, setServerErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const registerForm = (values) => {
    setServerErrors([]);
    setSuccessMsg("");

    registerMutation.mutate(values, {
      onSuccess: () => {
        setSuccessMsg("تم إنشاء الحساب بنجاح");
      },
      onError: (err) => {
        const apiErrors = err.response?.data?.errors;
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.response?.data?.msg;

        if (Array.isArray(apiErrors) && apiErrors.length > 0) {
          setServerErrors(apiErrors);
        } else if (msg) {
          setServerErrors([msg]);
        } else {
          setServerErrors(["فشل إنشاء الحساب"]);
        }
      },
    });
  };

  const isSubmitting = registerMutation.isPending;

  return (
    <Box className="register-form">
      <Typography variant="h4">Register Page</Typography>

      {serverErrors.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {serverErrors.map((err, index) => (
            <Alert key={index} severity="error" sx={{ mb: 1 }}>
              {err}
            </Alert>
          ))}
        </Box>
      )}

      {successMsg && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMsg}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(registerForm)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
      >
        <TextField
          label="User Name"
          {...register("userName")}
          error={!!errors.userName}
          helperText={errors.userName?.message}
          disabled={isSubmitting}
        />

        <TextField
          label="Full Name"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          disabled={isSubmitting}
        />

        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isSubmitting}
        />

        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isSubmitting}
        />

        <TextField
          label="Phone Number"
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          disabled={isSubmitting}
        />

        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </Box>
    </Box>
  );
}
