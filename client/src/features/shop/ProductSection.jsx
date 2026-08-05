import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";

/** One category of the shop catalog: heading, loading/error states, and a grid of ProductCards. */
export const ProductSection = ({
  sectionRef,
  title,
  errorLabel,
  loading,
  error,
  products,
  onAddToCart,
}) => (
  <Box ref={sectionRef} sx={{ mb: 10 }}>
    <Typography
      variant="h3"
      component="h2"
      gutterBottom
      sx={{
        fontWeight: "bold",
        color: "primary.main",
        mb: 4,
        borderBottom: "3px solid",
        borderColor: "primary.main",
        pb: 1,
        display: "inline-block",
      }}
    >
      {title}
    </Typography>

    {loading ? (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    ) : error ? (
      <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
        Error loading {errorLabel} products: {error}
      </Typography>
    ) : (
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard
              product={{
                id: product.id,
                name: product.product_name,
                price: `$${product.price}`,
                image: product.img_url,
                description: product.description,
              }}
              onAddToCart={onAddToCart}
            />
          </Grid>
        ))}
      </Grid>
    )}
  </Box>
);
