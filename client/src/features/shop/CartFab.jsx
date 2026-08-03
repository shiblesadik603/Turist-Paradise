import { Box, Fab, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

/** Floating shortcut to the cart page, shown once at least one item has been added. */
export const CartFab = ({ count, onClick }) => (
  <Box
    sx={{
      position: "fixed",
      top: "100px",
      right: "20px",
      zIndex: 1100,
    }}
  >
    <Fab
      color="primary"
      aria-label="shopping cart"
      onClick={onClick}
      sx={{
        width: 60,
        height: 60,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Badge badgeContent={count} color="error">
        <ShoppingCartIcon />
      </Badge>
    </Fab>
  </Box>
);
