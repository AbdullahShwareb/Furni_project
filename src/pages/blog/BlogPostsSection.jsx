import { Box, Container, Grid, Typography, Button } from "@mui/material";

import post1 from "../../assets/post-1.jpg";
import post2 from "../../assets/post-2.jpg";
import post3 from "../../assets/post-3.jpg";

const posts = [
  {
    id: 1,
    img: post1,
    date: "Dec 10, 2025",
    title: "How to choose the perfect sofa for your living room",
    desc: "Learn the key things to look for when choosing a sofa that’s both stylish and comfortable for daily use.",
  },
  {
    id: 2,
    img: post2,
    date: "Dec 15, 2025",
    title: "Modern interior design ideas for small homes",
    desc: "Smart tips to make small spaces feel bigger, brighter and more functional with the right furniture.",
  },
  {
    id: 3,
    img: post3,
    date: "Dec 20, 2025",
    title: "Fabric vs. leather sofas: which is better?",
    desc: "We compare fabric and leather sofas so you can choose the material that fits your lifestyle and budget.",
  },
];

export default function BlogPostsSection() {
  return (
    <Box sx={{ py: 10, backgroundColor: "#f5f7f6" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 1, color: "#000" }}
          >
            Recent Blog Posts
          </Typography>
          <Typography sx={{ color: "#6b7280", maxWidth: 540, mx: "auto" }}>
            Articles and tips to help you create a warm, modern and comfortable
            home with the right furniture.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid key={post.id} item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="img"
                  src={post.img}
                  alt={post.title}
                  sx={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                  }}
                />

                <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      color: "#9ca3af",
                      mb: 1,
                    }}
                  >
                    {post.date}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      mb: 1,
                      color: "#111827",
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#6b7280",
                      lineHeight: 1.7,
                      mb: 2,
                      flexGrow: 1,
                    }}
                  >
                    {post.desc}
                  </Typography>

                  <Button
                    variant="text"
                    sx={{
                      alignSelf: "flex-start",
                      px: 0,
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#3b5d50",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#2f4b42",
                      },
                    }}
                  >
                    Read More
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
