import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const TESTIMONIALS = [
  {
    quote:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.",
    name: "Maria Jones",
    title: "CEO, Co-Founder, XYZ Inc.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
  },
  {
    quote:
      "Integer convallis volutpat dui quis scelerisque. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum.",
    name: "James Carter",
    title: "Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  },
  {
    quote:
      "Aliquam vulputate velit imperdiet dolor tempor tristique. Nullam ac aliquet velit. Donec vitae odio quis nisl dapibus malesuada. Sed posuere consectetur est at lobortis.",
    name: "Sara Ahmed",
    title: "Marketing Lead",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
  },
];

export default function TestimonialsSection({
  autoPlay = true,
  interval = 4500,
}) {
  const items = useMemo(() => TESTIMONIALS, []);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
    
  }, [autoPlay, interval, items.length]);

  const t = items[index];

  return (
    <Box sx={{ py: 10, backgroundColor: "#F3F4F2" }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: 800, mb: 4 }}
        >
          Testimonials
        </Typography>

        <Box sx={{ position: "relative", textAlign: "center" }}>
          <IconButton
            onClick={prev}
            sx={{
              position: "absolute",
              left: { xs: -4, sm: -40 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.06)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.12)" },
              width: 52,
              height: 52,
            }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <IconButton
            onClick={next}
            sx={{
              position: "absolute",
              right: { xs: -4, sm: -40 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.06)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.12)" },
              width: 52,
              height: 52,
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>

          <Typography
            sx={{
              color: "#6B7280",
              fontSize: { xs: 15, sm: 16 },
              lineHeight: 2,
              px: { xs: 2, sm: 6 },
              minHeight: { xs: 220, sm: 180 }, 
            }}
          >
            “{t.quote}”
          </Typography>

          <Stack alignItems="center" spacing={1.2} sx={{ mt: 4 }}>
            <Avatar
              src={t.avatar}
              alt={t.name}
              sx={{ width: 64, height: 64 }}
            />
            <Typography sx={{ fontWeight: 800 }}>{t.name}</Typography>
            <Typography sx={{ color: "#6B7280", fontSize: 13 }}>
              {t.title}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 4 }}>
            {items.map((_, i) => (
              <Box
                key={i}
                onClick={() => setIndex(i)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  cursor: "pointer",
                  bgcolor: i === index ? "#3b5d50" : "rgba(0,0,0,0.18)",
                  transition: "transform 200ms ease",
                  transform: i === index ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
