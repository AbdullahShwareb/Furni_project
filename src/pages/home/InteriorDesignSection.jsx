// src/pages/home/InteriorDesignSection.jsx
import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";

import interiorMain from "../../assets/img-grid-1.jpg";
import interiorTop from "../../assets/img-grid-2.jpg";
import interiorBottom from "../../assets/img-grid-3.jpg";

export default function InteriorDesignSection() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#eff2f1",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 6, md: 10 },
          }}
        >
          <Box
            sx={{
              flex: "0 0 52%",
              position: "relative",
              minHeight: { xs: 380, md: 420 },
            }}
          >

            <Box
              sx={{
                position: "absolute",
                top: 80,
                left: 20,
                width: { xs: "72%", md: 420 },
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: "0 24px 55px rgba(15,23,42,0.18)",
                bgcolor: "white",
                zIndex: 1,
              }}
            >
              <Box
                component="img"
                src={interiorMain}
                alt="Interior main"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: 20,
                right: { xs: 10, md: 2 },
                width: { xs: "38%", md: 260 },
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 20px 45px rgba(15,23,42,0.15)",
                bgcolor: "white",
                zIndex: 2,
              }}
            >
              <Box
                component="img"
                src={interiorTop}
                alt="Interior top"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: { xs: "50%", md: 250 },
                transform: { xs: "translateX(-50%)", md: "none" },
                width: { xs: "70%", md: 360 },
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: "0 24px 55px rgba(15,23,42,0.18)",
                bgcolor: "white",
                zIndex: 1,
              }}
            >
              <Box
                component="img"
                src={interiorBottom}
                alt="Interior bottom"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>

          <Box sx={{ flex: "0 0 48%", maxWidth: 560 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 28, md: 34 },
                mb: 2,
                color: "#222",
              }}
            >
              We Help You Make Modern
              <br />
              Interior Design
            </Typography>

            <Typography
              sx={{
                color: "#6c757d",
                fontSize: 14,
                lineHeight: 1.9,
                mb: 4,
              }}
            >
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
              quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
              vulputate velit imperdiet dolor tempor tristique. Pellentesque
              habitant morbi tristique senectus et netus et malesuada.
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <Box
                  component="ul"
                  sx={{
                    listStyle: "disc",
                    pl: 3,
                    m: 0,
                    color: "#6c757d",
                    fontSize: 14,
                    lineHeight: 1.9,
                  }}
                >
                  <li>Donec vitae odio quis nisl dapibus malesuada</li>
                  <li>Donec vitae odio quis nisl dapibus malesuada</li>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  component="ul"
                  sx={{
                    listStyle: "disc",
                    pl: 3,
                    m: 0,
                    color: "#6c757d",
                    fontSize: 14,
                    lineHeight: 1.9,
                  }}
                >
                  <li>Donec vitae odio quis nisl dapibus malesuada</li>
                  <li>Donec vitae odio quis nisl dapibus malesuada</li>
                </Box>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#222",
                color: "#fff",
                borderRadius: 999,
                px: 5,
                py: 1.4,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 14,
                boxShadow: "0 14px 30px rgba(15,23,42,0.25)",
                "&:hover": {
                  bgcolor: "#000",
                },
              }}
            >
              Explore
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
