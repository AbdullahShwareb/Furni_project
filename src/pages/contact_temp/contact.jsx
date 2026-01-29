import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";

import couch from "../../assets/couch.png";

export default function Contact() {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#3b5d50",
          color: "white",
          minHeight: { xs: "auto", sm: "70vh", md: "80vh" },
          display: "flex",
          alignItems: "center",
          py: { xs: 6, sm: 8 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.05,
                  fontSize: { xs: 40, sm: 52, md: 62 },
                }}
              >
                Contact
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "rgba(255,255,255,0.75)",
                  maxWidth: 520,
                  lineHeight: 1.9,
                  fontSize: 15,
                }}
              >
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </Typography>

              <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#f9bf29",
                    color: "#1a1a1a",
                    fontWeight: 800,
                    px: 4,
                    py: 1.2,
                    borderRadius: 999,
                    "&:hover": { bgcolor: "#f0b51f" },
                  }}
                >
                  Shop Now
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.55)",
                    fontWeight: 800,
                    px: 4,
                    py: 1.2,
                    borderRadius: 999,
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  Explore
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-end" },
                }}
              >

                <Box
                  component="img"
                  src={couch}
                  alt="couch"
                  sx={{
                    width: { xs: "92%", sm: "100%" },
                    maxWidth: { sm: 620, md: 760 },
                    height: "auto",
                    display: "block",
                    zIndex: 1,
                    filter: "drop-shadow(0px 26px 30px rgba(0,0,0,0.28))",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "#f6f7f6", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Grid container spacing={3} sx={{ mb: 6 }} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: "transparent",
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: 2,
                    bgcolor: "#3b5d50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <LocationOnRoundedIcon sx={{ color: "white" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.75)",
                    lineHeight: 1.7,
                    mt: 0.6,
                  }}
                >
                  43 Raymouth Rd. Baltemoer,
                  <br />
                  London 3910
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: "transparent",
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: 2,
                    bgcolor: "#3b5d50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MailRoundedIcon sx={{ color: "white" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.75)",
                    lineHeight: 1.7,
                    mt: 0.6,
                  }}
                >
                  info@yourdomain.com
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: "transparent",
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: 2,
                    bgcolor: "#3b5d50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CallRoundedIcon sx={{ color: "white" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.75)",
                    lineHeight: 1.7,
                    mt: 0.6,
                  }}
                >
                  +1 294 3925 3939
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: 13, mb: 0.8, color: "rgba(0,0,0,0.75)" }}>
                First name
              </Typography>
              <TextField
                fullWidth
                size="small"
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: 13, mb: 0.8, color: "rgba(0,0,0,0.75)" }}>
                Last name
              </Typography>
              <TextField
                fullWidth
                size="small"
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: 13, mb: 0.8, color: "rgba(0,0,0,0.75)" }}>
                Email address
              </Typography>
              <TextField
                fullWidth
                size="small"
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: 13, mb: 1.8, color: "rgba(0,0,0,0.75)" }}>
                Message
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={10}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
  <Box sx={{ mt: 18 }}>
    <Button
      variant="contained"
      sx={{
        bgcolor: "#1f1f1f",
        color: "white",
        fontWeight: 500,
        px: 4,
        py: .3,
        borderRadius: 99,
        "&:hover": { bgcolor: "#111" },
      }}
    >
      Send Message
    </Button>
  </Box>
</Grid>

          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
