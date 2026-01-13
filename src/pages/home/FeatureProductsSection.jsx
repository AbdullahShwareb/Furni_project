import { Box, Container, Grid, Typography } from "@mui/material";

import p1 from "../../assets/product-1-1.png";
import p2 from "../../assets/product-1-2.png";
import p3 from "../../assets/product-3-1.png";

const items = [
  {
    title: "Nordic Chair",
    desc: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio",
    img: p1,
  },
  {
    title: "Kruzo Aero Chair",
    desc: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio",
    img: p2,
  },
  {
    title: "Ergonomic Chair",
    desc: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio",
    img: p3,
  },
];

export default function FeatureProductsSection() {
  return (
    <Box
      sx={{
        mt: 12,             
        py: 8,
        backgroundColor: "#F3F4F2",
      }}
    >
    <Container maxWidth="lg">
  <Grid container columnSpacing={4} rowSpacing={6} wrap="nowrap">
    {items.map((it) => (
      <Grid key={it.title} item xs={4}>
        <Box sx={{ display: "flex", gap: 2.5, minWidth: 0 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: 3,
              backgroundColor: "#E9EEEA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={it.img}
              alt={it.title}
              sx={{ width: 92, height: 92, objectFit: "contain" }}
            />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
              {it.title}
            </Typography>

            <Typography sx={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7 }}>
              {it.desc}
            </Typography>

            <Typography sx={{ mt: 1, fontSize: 14, fontWeight: 500 }}>
              Read More
            </Typography>
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
</Container>

    </Box>
  );
}
