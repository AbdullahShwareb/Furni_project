import { Box, Card, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useCategories } from "../../hooks/useCategories";

export default function Categories() {
  const { isLoading, isError, data, error } = useCategories();

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>error: {error?.message}</Typography>;

  // ✅ لأن الـ API بيرجع { response: [...] }
  const list = Array.isArray(data?.response) ? data.response : [];

  return (
    <Box p={3}>
      <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
        Categories
      </Typography>

      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {list.map((category, idx) => (
            <Grid key={category.id ?? idx} item xs={12} sm={6} md={5} lg={3}>
              <Card sx={{ textAlign: "center", p: 4 }}>
                {category.name ?? `Category #${category.id}`}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
