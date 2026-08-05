import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";

/** A single product tile in the shop grid, with an "Add to Cart" action. */
export const ProductCard = ({ product, onAddToCart }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 6,
      },
    }}
  >
    <CardMedia
      component="img"
      height="200"
      image={product.image}
      alt={product.name}
      sx={{ objectFit: "contain", p: 2 }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
        {product.name}
      </Typography>
      {product.description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
      )}
      <Typography variant="h5" color="primary" sx={{ fontWeight: "bold", mt: 1 }}>
        {product.price}
      </Typography>
    </CardContent>
    <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
      <Button size="small" variant="outlined" color="primary" sx={{ fontWeight: "bold" }}>
        Details
      </Button>
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ fontWeight: "bold" }}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </Button>
    </Box>
  </Card>
);
