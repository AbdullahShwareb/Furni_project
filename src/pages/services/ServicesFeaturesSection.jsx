import { Box, Container, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import React from "react";

const items = [
  {
    title: "Fast & Free Shipping",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    title: "Easy to Shop",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
    icon: <ShoppingBagOutlinedIcon />,
  },
  {
    title: "24/7 Support",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
    icon: <SupportAgentOutlinedIcon />,
  },
  {
    title: "Hassle Free Returns",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
    icon: <AutorenewOutlinedIcon />,
  },

  {
    title: "Fast & Free Shipping",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    title: "Easy to Shop",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
    icon: <ShoppingBagOutlinedIcon />,
  },
  {
    title: "24/7 Support",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
    icon: <SupportAgentOutlinedIcon />,
  },
  {
    title: "Hassle Free Returns",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
    icon: <AutorenewOutlinedIcon />,
  },
];

export default function ServicesFeaturesSection() {
  return (
    <Box sx={{ backgroundColor: "#f5f7f6", py: 10 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            rowGap: 8,
            columnGap: 6,
          }}
        >
          {items.map((item, index) => (
            <Box key={index}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "#dde6e2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                {item.icon &&
                  React.cloneElement(item.icon, {
                    sx: { fontSize: 32 },
                  })}
              </Box>

              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                {item.title}
              </Typography>

              <Typography sx={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
