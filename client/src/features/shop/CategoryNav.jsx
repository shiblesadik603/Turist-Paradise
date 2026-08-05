import { Box, Container, Grid, Button } from "@mui/material";

/** Sticky nav bar that scrolls the page to each product category section. */
export const CategoryNav = ({ categories, activeCategory, onSelect }) => (
  <Box
    sx={{
      position: "sticky",
      top: 64,
      bgcolor: "white",
      zIndex: 1000,
      boxShadow: 2,
      py: 2,
    }}
  >
    <Container>
      <Grid container justifyContent="center" spacing={2}>
        {categories.map((category) => (
          <Grid item key={category.id}>
            <Button
              variant={activeCategory === category.id ? "contained" : "outlined"}
              color="primary"
              onClick={() => onSelect(category.id)}
              sx={{
                fontWeight: "bold",
                borderRadius: "25px",
                px: 3,
                transition: "all 0.3s ease",
              }}
            >
              {category.navLabel}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);
