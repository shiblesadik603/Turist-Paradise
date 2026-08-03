import { Box, Container, Typography } from "@mui/material";

export const ShopHero = () => (
  <Box
    sx={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      py: 8,
      textAlign: "center",
    }}
  >
    <Container>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
        Travel Gear Marketplace
      </Typography>
      <Typography variant="h5" component="p">
        Premium accessories for your adventures
      </Typography>
    </Container>
  </Box>
);
