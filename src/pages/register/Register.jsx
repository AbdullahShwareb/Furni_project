import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const registerForm = async (values) => {
    setServerError("");
    setSuccessMsg("");

    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/Register",
        values
      );
      console.log("register response:", response.data);
      setSuccessMsg("تم إنشاء الحساب بنجاح ");
      reset();
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (err) {
      console.log("register error:", err);
      setServerError("فشل إنشاء الحساب، حاول مرة أخرى.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f0f4f2", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2, color: "#3b5d50" }}
          >
            Create Account
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
            onSubmit={handleSubmit(registerForm)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="User name" fullWidth {...register("userName")} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Full name" fullWidth {...register("fullName")} />
              </Grid>
            </Grid>

            <TextField label="Email" type="email" fullWidth {...register("email")} />

            <TextField
              label="Phone number"
              fullWidth
              {...register("phoneNumber")}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 1,
                backgroundColor: "#f9bf29",
                color: "#2f2f2f",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#e6ae17" },
              }}
            >
              {isSubmitting ? "جاري إنشاء الحساب..." : "Register"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
