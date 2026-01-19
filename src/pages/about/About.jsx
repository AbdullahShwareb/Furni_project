import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import couchImg from "../../assets/couch (1).png";
import WhyChooseUsSection from "../home/WhyChooseUsSection";
import OurTeamSection from "./OurTeamSection";

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          backgroundColor: "#3b5d50",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flex: 1, color: "#fff" }}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
                About Us
              </Typography>

              <Typography
                sx={{
                  color: "#d1ddd8",
                  maxWidth: 500,
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                Donec vitae odio quis nisl dapibus malesuada.
                Nullam ac aliquet velit. Aliquam vulputate
                velit imperdiet dolor tempor tristique.
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  onClick={() => navigate("/shop")}
                  sx={{
                    backgroundColor: "#f9bf29",
                    color: "#000",
                    px: 4,
                    py: 1.2,
                    borderRadius: 6,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#f3b91e",
                    },
                  }}
                >
                  Shop Now
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    px: 4,
                    py: 1.2,
                    borderRadius: 6,
                    "&:hover": {
                      borderColor: "#f9bf29",
                      color: "#f9bf29",
                    },
                  }}
                >
                  Explore
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={couchImg}
                alt="Couch"
                sx={{
                  width: "100%",
                  maxWidth: 520,
                  filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.25))",
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* WHY CHOOSE US SECTION */}
      <WhyChooseUsSection />


         {/* OUR TEAM */}
    <OurTeamSection />
    </>
  );
}


