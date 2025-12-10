import axios from "axios";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Login() {
  const { register, handleSubmit } = useForm({});

  const loginForm = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/Login",
        values
      );
      console.log(response);
    } catch (err) {
      console.log(err);
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
          gap: 3,
          mt: 5,
          width: "100%",
          maxWidth: 400,
          alignItems: "center",
        }}
      >
        <TextField
          label="user email"
          {...register("email")}
          fullWidth
          variant="outlined"
        />

        <TextField
          label="password"
          {...register("password")}
          type="password"
          fullWidth
          variant="outlined"
        />

        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
}
