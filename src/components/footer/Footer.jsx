import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Stack,
  Link,
  Divider,
} from "@mui/material";

import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import sofa from "../../assets/sofa.png";

export default function Footer() {
  const year = new Date().getFullYear();

  const linkSx = {
    color: "rgba(0,0,0,0.65)",
    textDecoration: "none",
    fontSize: 14,
    "&:hover": { color: "#2f554f", textDecoration: "underline" },
  };

  return (
    <Box component="footer" sx={{ bgcolor: "#f6f7f6", mt: 10 }}>
      <Box
        sx={{
          bgcolor: "#e9eeec",
          pt: { xs: 4, md: 6 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Container>
          <Grid
            container
            alignItems="center"
            spacing={3}
            sx={{
              minHeight: { md: 220 },
            }}
          >
            <Grid item xs={12} md={7}>
              <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 2 }}>
                <MailOutlineRoundedIcon sx={{ color: "#2f554f" }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1f3f3a" }}>
                  Subscribe to Newsletter
                </Typography>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  placeholder="Enter your name"
                  size="small"
                  fullWidth
                  sx={{
                    bgcolor: "white",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": { borderRadius: 1 },
                  }}
                />

                <TextField
                  placeholder="Enter your email"
                  size="small"
                  fullWidth
                  sx={{
                    bgcolor: "white",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": { borderRadius: 1 },
                  }}
                />

                <IconButton
                  sx={{
                    width: { xs: "100%", sm: 54 },
                    height: 42,
                    bgcolor: "#2f554f",
                    color: "white",
                    borderRadius: 1,
                    "&:hover": { bgcolor: "#264944" },
                  }}
                >
                  <SendRoundedIcon />
                </IconButton>
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={sofa}
                alt="sofa"
                sx={{
                  width: { xs: "100%", sm: 420, md: 520 },
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0px 18px 22px rgba(0,0,0,0.14))",
                  mt: { xs: 2, md: -6 },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 7 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#2f554f" }}>
              Furni
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: "rgba(0,0,0,0.65)",
                lineHeight: 2,
                maxWidth: 380,
              }}
            >
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis
              nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate
              velit imperdiet dolor tempor tristique.
            </Typography>

            <Stack direction="row" spacing={1.2} sx={{ mt: 3 }}>
              {[
                { icon: <FacebookRoundedIcon />, href: "#" },
                { icon: <TwitterIcon />, href: "#" },
                { icon: <InstagramIcon />, href: "#" },
                { icon: <LinkedInIcon />, href: "#" },
              ].map((item, idx) => (
                <IconButton
                  key={idx}
                  component="a"
                  href={item.href}
                  sx={{
                    bgcolor: "rgba(47,85,79,0.12)",
                    color: "#2f554f",
                    "&:hover": { bgcolor: "rgba(47,85,79,0.2)" },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Stack spacing={1.3}>
                  <Link href="/about" sx={linkSx}>About us</Link>
                  <Link href="/services" sx={linkSx}>Services</Link>
                  <Link href="/blog" sx={linkSx}>Blog</Link>
                  <Link href="/contact" sx={linkSx}>Contact us</Link>
                </Stack>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Stack spacing={1.3}>
                  <Link href="#" sx={linkSx}>Support</Link>
                  <Link href="#" sx={linkSx}>Knowledge base</Link>
                  <Link href="#" sx={linkSx}>Live chat</Link>
                </Stack>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Stack spacing={1.3}>
                  <Link href="#" sx={linkSx}>Jobs</Link>
                  <Link href="#" sx={linkSx}>Our team</Link>
                  <Link href="#" sx={linkSx}>Leadership</Link>
                  <Link href="/privacy" sx={linkSx}>Privacy Policy</Link>
                </Stack>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Stack spacing={1.3}>
                  <Link href="#" sx={linkSx}>Nordic Chair</Link>
                  <Link href="#" sx={linkSx}>Kruzo Aero</Link>
                  <Link href="#" sx={linkSx}>Ergonomic Chair</Link>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.55)" }}>
              Copyright ©{year}. All Rights Reserved. — Designed with love by
              Untree.co Distributed By ThemeWagon
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack
              direction="row"
              spacing={3}
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
            >
              <Link href="/terms" sx={linkSx}>Terms & Conditions</Link>
              <Link href="/privacy" sx={linkSx}>Privacy Policy</Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
