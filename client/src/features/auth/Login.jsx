import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Alert, Checkbox, FormControlLabel } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../../hooks/useAuth";
import { AuthLayout } from "./AuthLayout";
import { PasswordField } from "./PasswordField";
import { isValidEmail } from "../../utils/validators";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const emailError = touched && email && !isValidEmail(email) ? "Enter a valid email address" : "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setTouched(true);
    setError("");

    if (!isValidEmail(email) || !password) {
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password, rememberMe);
      navigate("/home");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Wrong credentials. Please try again.");
      } else if (err.request) {
        setError("Cannot connect to server. Please check your internet connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heroImage="/photos/hiker-sunset.jpeg"
      heroAlt="A hiker looking out over misty mountains at sunset"
      eyebrow="Welcome back"
      tagline="Your next journey is one click away."
      subtitle="Sign in to pick up where you left off — saved destinations, itineraries, and your travel gear cart."
    >
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Log in
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        New here?{" "}
        <Link to="/signup" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>
          Create an account
        </Link>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleLogin} noValidate>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          required
          error={Boolean(emailError)}
          helperText={emailError}
          autoComplete="email"
        />
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              size="small"
            />
          }
          label={<Typography variant="body2">Remember me on this device</Typography>}
          sx={{ mt: 0.5 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          startIcon={<LoginIcon />}
          disabled={submitting}
          sx={{ mt: 2, py: 1.3, fontWeight: 700, textTransform: "none", fontSize: "1rem" }}
        >
          {submitting ? "Logging in…" : "Log in"}
        </Button>
      </form>
    </AuthLayout>
  );
};
