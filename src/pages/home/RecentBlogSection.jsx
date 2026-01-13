import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

import post1 from "../../assets/post-1.jpg";
import post2 from "../../assets/post-2.jpg";
import post3 from "../../assets/post-3.jpg";

const posts = [
  {
    id: 1,
    title: "First Time Home Owner Ideas",
    author: "Kristin Watson",
    date: "Dec 19, 2021",
    image: post1,
  },
  {
    id: 2,
    title: "How To Keep Your Furniture Clean",
    author: "Robert Fox",
    date: "Dec 15, 2021",
    image: post2,
  },
  {
    id: 3,
    title: "Small Space Furniture Apartment Ideas",
    author: "Kristin Watson",
    date: "Dec 12, 2021",
    image: post3,
  },
];

export default function RecentBlogSection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 10, backgroundColor: "#F3F4F2" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Recent Blog
          </Typography>

          <Link
            component="button"
            underline="always"
            onClick={() => navigate("/blog")}
            sx={{ fontWeight: 600, color: "#111827" }}
          >
            View All Posts
          </Link>
        </Box>

<Grid container spacing={4} wrap="nowrap">
          {posts.map((post) => (
            <Grid key={post.id} item xs={12} md={4}>
              <Box sx={{ cursor: "pointer" }}>
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title}
                  sx={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover",
                    borderRadius: 5,
                  }}
                />

                <Typography sx={{ mt: 2, fontWeight: 800 }}>
                  {post.title}
                </Typography>

                <Typography sx={{ mt: 0.5, fontSize: 13, color: "#6B7280" }}>
                  by{" "}
                  <Box component="span" sx={{ fontWeight: 700, color: "#111827" }}>
                    {post.author}
                  </Box>{" "}
                  on{" "}
                  <Box component="span" sx={{ fontWeight: 700, color: "#111827" }}>
                    {post.date}
                  </Box>
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
