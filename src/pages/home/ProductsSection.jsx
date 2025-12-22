import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";

import p1 from "../../assets/product-1.png";
import p2 from "../../assets/product-2.png";
import p3 from "../../assets/product-3.png";

const items = [
  { id: 1, title: "Nordic Chair", price: 50, img: p1 },
  { id: 2, title: "Kruzo Aero Chair", price: 78, img: p2 },
  { id: 3, title: "Ergonomic Chair", price: 43, img: p3 },
];

function ProductCard({ product, onClick }) {
  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      sx={{
        position: "relative",
        textAlign: "center",
        px: 2,
        py: 3,
        borderRadius: 4,
        cursor: "pointer",
        transition: "0.25s",
        "&:hover": { bgcolor: "#dfe7e5", transform: "translateY(-2px)" },
        "&:hover .addBtn": { opacity: 1, transform: "translate(-50%, 0)" },
      }}
    >
      <Box
        component="img"
        src={product.img}
        alt={product.title}
        sx={{
          width: { xs: 160, sm: 190, md: 220 },
          height: "auto",
          display: "block",
          mx: "auto",
          mb: 2,
          filter: "drop-shadow(0px 18px 18px rgba(0,0,0,0.12))",
        }}
      />

      <Typography sx={{ fontWeight: 800, color: "#1f1f1f" }}>
        {product.title}
      </Typography>

      <Typography sx={{ fontWeight: 900, mt: 0.5, color: "#1f1f1f" }}>
        ${product.price.toFixed(2)}
      </Typography>

      <Box
        className="addBtn"
        sx={{
          position: "absolute",
          left: "50%",
          bottom: -18,
          transform: "translate(-50%, 10px)",
          width: 38,
          height: 38,
          borderRadius: "50%",
          bgcolor: "#1f1f1f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "0.25s",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <AddRoundedIcon sx={{ color: "white" }} />
      </Box>
    </Box>
  );
}

export default function ProductsSection() {
  const navigate = useNavigate();

  const goToCart = (product) => {
    navigate("/cart", { state: { addProduct: product } });
  };

  return (
    <Box sx={{ bgcolor: "#f6f7f6", py: { xs: 6, md: 9 } }}>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 4, md: 8 }, 
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: { xs: 34, sm: 40, md: 46 },
                lineHeight: 1.05,
                color: "#1f1f1f",
                maxWidth: 340,
              }}
            >
              Crafted with <br /> excellent material.
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "rgba(0,0,0,0.65)",
                lineHeight: 1.9,
                maxWidth: 360,
                fontSize: 14,
              }}
            >
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.
              Aliquam vulputate velit imperdiet dolor tempor tristique.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "#1f1f1f",
                borderRadius: 999,
                px: 4,
                py: 1.2,
                fontWeight: 900,
                "&:hover": { bgcolor: "#111" },
              }}
            >
              Explore
            </Button>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {items.map((p) => (
                <Grid key={p.id} item xs={12} sm={4}>
                  <ProductCard product={p} onClick={() => goToCart(p)} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
