import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import couch from "../../assets/couch.png";
import ProductsSection from "./ProductsSection";
import WhyChooseUsSection from "./WhyChooseUsSection.jsx";
import InteriorDesignSection from "./InteriorDesignSection.jsx";
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          bgcolor: "#3b5d50",
          color: "white",
          minHeight: { xs: "auto", sm: "80vh", md: "90vh" },
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
                  fontSize: { xs: 34, sm: 44, md: 62 },
                  maxWidth: 560,
                }}
              >
                Modern Interior <br /> Design Studio
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

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/shop")}
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
                  onClick={() => navigate("/about")}
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
                    width: { xs: "90%", sm: "100%" },
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

      <ProductsSection />

      <WhyChooseUsSection />
 <InteriorDesignSection /> 
      
    </>
  );
}