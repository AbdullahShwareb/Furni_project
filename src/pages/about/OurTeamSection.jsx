import { Box, Container, Typography } from "@mui/material";

import team1 from "../../assets/team-1.jpg";
import team2 from "../../assets/team-2.jpg";
import team3 from "../../assets/team-3.jpg";
import team4 from "../../assets/team-4.jpg";

const team = [
  { name: "Lawson Arnold", role: "CEO, Founder, Atty.", img: team1 },
  { name: "Jeremy Walker", role: "CEO, Founder, Atty.", img: team2 },
  { name: "Patrik White", role: "CEO, Founder, Atty.", img: team3 },
  { name: "Kathryn Ryan", role: "CEO, Founder, Atty.", img: team4 },
];

export default function OurTeamSection() {
  return (
    <Box sx={{ backgroundColor: "#f5f7f6", py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: 700, mb: 6 }}
        >
          Our Team
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 4,
          }}
        >
          {team.map((member, i) => (
            <Box key={i}>
              <Box
                component="img"
                src={member.img}
                alt={member.name}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                  display: "block",
                }}
              />

              <Typography sx={{ fontWeight: 700 }}>{member.name}</Typography>

              <Typography sx={{ fontSize: 14, color: "#6a6a6a", mb: 1 }}>
                {member.role}
              </Typography>

              <Typography sx={{ fontSize: 14, color: "#6a6a6a" }}>
                Separated they live in. Separated they live in Bookmarksgrove
                right at the coast of the Semantics.
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  fontWeight: 600,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Learn More
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
