import { Box, Container, Typography, Paper, CircularProgress } from "@mui/material";
import { useCategories } from "../../hooks/useCategories";

export default function Categories() {
  const { isLoading, isError, data, error } = useCategories();

  const raw = data ?? [];
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(raw.response)
    ? raw.response
    : Array.isArray(raw.data)
    ? raw.data
    : [];

  if (isLoading) {
    return (
      <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography color="error">Error: {error?.message ?? "Failed to load categories"}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, bgcolor: "#f5f7f8" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1,
            }}
          >
            Categories
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 520, mx: "auto" }}
          >
            Explore our product categories and find exactly what you need for your home.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
              lg: "repeat(5, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {list.map((cat, idx) => {
            const name =
              cat.name ??
              cat.nameEn ??
              cat.nameAr ??
              cat.title ??
              `Category #${idx + 1}`;

            const firstLetter = name.charAt(0).toUpperCase();

            return (
              <Paper
                key={cat.id ?? cat.categoryId ?? idx}
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
                    bgcolor: "#ffffff",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "#3b5d50",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    fontSize: 26,
                    fontWeight: 700,
                  }}
                >
                  {firstLetter}
                </Box>

                {/* اسم الكاتيجوري */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    fontSize: 16,
                  }}
                >
                  {name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: 13,
                  }}
                >
                  Browse {name.toLowerCase()} products and discover our best deals.
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
