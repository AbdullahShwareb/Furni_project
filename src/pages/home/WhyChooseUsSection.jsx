import React from "react";
import { Box, Container, Typography } from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

import whyChooseUsImg from "../../assets/why-choose-us-img.jpg";

const features = [
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 26 }} />,
    title: "Fast & Free Shipping",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
  {
    icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 26 }} />,
    title: "Easy to Shop",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
  {
    icon: <SupportAgentOutlinedIcon sx={{ fontSize: 26 }} />,
    title: "24/7 Support",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
  {
    icon: <AutorenewOutlinedIcon sx={{ fontSize: 26 }} />,
    title: "Hassle Free Returns",
    desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#eff2f1",
        py: { xs: 8, md: 12 },
      }}
    >
<Container
  maxWidth="xl"
  sx={{
    pl: { xs: 2, sm: 4, md: 8 }, 
  }}
>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 6, md: 10 },
          }}
        >
          <Box sx={{ flex: "0 0 52%", maxWidth: 600 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 30, md: 34 },
                mb: 1.5,
                color: "#222",
              }}
            >
              Why Choose Us
            </Typography>

            <Typography
              sx={{
                mb: 5,
                color: "#6c757d",
                fontSize: 14,
                lineHeight: 1.9,
                maxWidth: 520,
              }}
            >
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
              velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                columnGap: 5,
                rowGap: 4,
              }}
            >
              {features.map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: 56,
                      height: 56,
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        bgcolor: "#dde4e2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 13,
                        mb: 0.3,
                        color: "#222",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        fontSize: 13,
                        lineHeight: 1.7,
                        maxWidth: 260,
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              flex: "0 0 48%",
              position: "relative",
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
           
            <Box
              sx={{
                position: "relative",
                bgcolor: "white",
                borderRadius: 6,
                overflow: "hidden",
                width: { xs: "100%", sm: 430, md: 460 },
                boxShadow: "0 24px 55px rgba(15,23,42,0.12)",
                zIndex: 1,
              }}
            >
              <Box
                component="img"
                src={whyChooseUsImg}
                alt="Why choose us"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
