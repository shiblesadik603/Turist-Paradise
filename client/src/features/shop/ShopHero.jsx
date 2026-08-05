import { Box, Container, Typography } from "@mui/material";

export const ShopHero = () => (
  <Box
    sx={{
      position: "relative",
      py: 10,
      textAlign: "center",
      overflow: "hidden",
      color: "#fff",
    }}
  >
    <Box
      component="img"
      src="/photos/hiker-sunset.jpeg"
      alt=""
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center 30%",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 30%, rgba(22,32,43,0.4) 0%, rgba(22,32,43,0.78) 70%)," +
          "linear-gradient(180deg, rgba(22,32,43,0.5) 0%, rgba(22,32,43,0.4) 40%, rgba(22,32,43,0.85) 100%)",
      }}
    />
    <Container sx={{ position: "relative", zIndex: 1 }}>
      <Typography
        component="span"
        sx={{
          display: "inline-block",
          textTransform: "uppercase",
          letterSpacing: "2.5px",
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "#e2b13c",
          mb: 2,
        }}
      >
        Gear Up
      </Typography>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 800, textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
      >
        Travel Gear Marketplace
      </Typography>
      <Typography variant="h5" component="p" sx={{ color: "rgba(255,255,255,0.88)" }}>
        Premium accessories for your adventures
      </Typography>
    </Container>
  </Box>
);
