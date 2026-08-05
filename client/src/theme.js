import { createTheme } from "@mui/material/styles";

/** Site-wide MUI theme: navy + gold, matching the photo-driven brand identity used across the app. */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#2c3e50",
      dark: "#16202b",
      light: "#34495e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e2b13c",
      contrastText: "#16202b",
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  shape: {
    borderRadius: 10,
  },
});
