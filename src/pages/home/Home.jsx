import { Box, Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#f0f4f2", minHeight: "calc(100vh - 64px)", py: 6 }}>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: 700, color: "#2f2f2f", mb: 2 }}>
          Furni Home
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
