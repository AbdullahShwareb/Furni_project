import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";

function fullNameFromProfile(profile) {
  if (!profile) return "User";
  return (
    profile.fullName ||
    profile.userName ||
    profile.name ||
    profile.email ||
    "User"
  );
}

function phoneFromProfile(profile) {
  if (!profile) return "";
  return profile.phoneNumber || profile.phone || "";
}

function getInitials(text) {
  if (!text) return "U";
  const clean = text.trim();
  const parts = clean.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

export default function ProfileView({
  profile,
  isLoading,
  isError,
  error,

  email,
  setEmail,
  handleEmailSubmit,
  savingEmail,

  pwdForm,
  onPwdFieldChange,
  handlePasswordSubmit,
  savingPassword,

  msg,
  errMsg,
}) {
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {error?.message || "فشل تحميل بيانات الحساب"}
        </Alert>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">لا توجد بيانات حساب</Alert>
      </Box>
    );
  }

  const fullName = fullNameFromProfile(profile);
  const phone = phoneFromProfile(profile);

  return (
    <Box
      sx={{
        bgcolor: "#f3f4f6",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 960, mx: "auto", px: 2 }}>
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2.5,
            border: "1px solid #e5e7eb",
            bgcolor: "#ffffff",
          }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: "#3b5d50",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {getInitials(fullName)}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 0.5, color: "#111827" }}
            >
              {fullName}
            </Typography>

            {profile.email && (
              <Typography
                variant="body2"
                sx={{ color: "#6b7280", wordBreak: "break-all" }}
              >
                {profile.email}
              </Typography>
            )}

            {phone && (
              <Typography
                variant="body2"
                sx={{ color: "#6b7280", mt: 0.5 }}
              >
                رقم الهاتف: {phone}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{ mt: 1, color: "#9ca3af" }}
            >
              من هنا يمكنك تحديث البريد الإلكتروني وكلمة المرور الخاصة بحسابك.
            </Typography>
          </Box>
        </Paper>

        {(msg || errMsg) && (
          <Box sx={{ mb: 3 }}>
            <Alert severity={errMsg ? "error" : "success"}>
              {errMsg || msg}
            </Alert>
          </Box>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                bgcolor: "#ffffff",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 1.5, fontWeight: 700, color: "#111827" }}
              >
                تغيير البريد الإلكتروني
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "#6b7280" }}
              >
                سيتم إرسال التنبيهات والمراسلات إلى هذا البريد.
              </Typography>

              <Box component="form" onSubmit={handleEmailSubmit}>
                <TextField
                  label="البريد الإلكتروني الجديد"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  disabled={savingEmail}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 999,
                    bgcolor: "#111827",
                    "&:hover": { bgcolor: "#000" },
                  }}
                >
                  {savingEmail ? "جاري الحفظ..." : "تحديث البريد"}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* تغيير كلمة المرور */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                bgcolor: "#ffffff",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 1.5, fontWeight: 700, color: "#111827" }}
              >
                تغيير كلمة المرور
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "#6b7280" }}
              >
                اختر كلمة مرور قوية لحماية حسابك.
              </Typography>

              <Box component="form" onSubmit={handlePasswordSubmit}>
                <TextField
                  label="كلمة المرور الحالية"
                  type="password"
                  value={pwdForm.currentPassword}
                  onChange={(e) =>
                    onPwdFieldChange("currentPassword", e.target.value)
                  }
                  fullWidth
                  required
                  size="small"
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="كلمة المرور الجديدة"
                  type="password"
                  value={pwdForm.newPassword}
                  onChange={(e) =>
                    onPwdFieldChange("newPassword", e.target.value)
                  }
                  fullWidth
                  required
                  size="small"
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="تأكيد كلمة المرور الجديدة"
                  type="password"
                  value={pwdForm.confirmNewPassword}
                  onChange={(e) =>
                    onPwdFieldChange("confirmNewPassword", e.target.value)
                  }
                  fullWidth
                  required
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Divider sx={{ my: 1.5 }} />

                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  disabled={savingPassword}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 999,
                    bgcolor: "#111827",
                    "&:hover": { bgcolor: "#000" },
                  }}
                >
                  {savingPassword ? "جاري الحفظ..." : "تحديث كلمة المرور"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
