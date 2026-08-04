import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Alert } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAuth } from "../../hooks/useAuth";
import { AuthLayout } from "./AuthLayout";
import { PasswordField } from "./PasswordField";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { isValidEmail, getPasswordRules } from "../../utils/validators";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const emailError = touched && email && !isValidEmail(email) ? "Enter a valid email address" : "";
  const passwordValid = getPasswordRules(password).every((rule) => rule.met);
  const passwordError =
    touched && password && !passwordValid ? "Password doesn't meet the requirements below" : "";

  const handleSignUp = async (e) => {
    e.preventDefault();
    setTouched(true);
    setError("");

    if (!name.trim() || !isValidEmail(email) || !passwordValid) {
      return;
    }

    setSubmitting(true);
    try {
      await signup(name.trim(), email, password);
      navigate("/home");
    } catch (err) {
      console.error("Error signing up:", err);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heroImage="/photos/friends-hiking.jpeg"
      heroAlt="A group of friends laughing together on a mountain trail"
      accentImage="/photos/travel-journal.jpeg"
      accentAlt="A collage travel journal with landmarks and mementos"
      eyebrow="Join the adventure"
      tagline="Every great trip starts with a single step."
      subtitle="Create your account to plan destinations, get AI-generated itineraries, and shop for travel gear."
    >
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Create your account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Already have one?{" "}
        <Link to="/login" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>
          Log in
        </Link>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSignUp} noValidate>
        <TextField
          label="Name"
          type="text"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
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
          autoComplete="new-password"
          error={Boolean(passwordError)}
        />
        <PasswordStrengthMeter password={password} />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          startIcon={<PersonAddIcon />}
          disabled={submitting}
          sx={{ mt: 2, py: 1.3, fontWeight: 700, textTransform: "none", fontSize: "1rem" }}
        >
          {submitting ? "Creating account…" : "Sign up"}
        </Button>
      </form>
    </AuthLayout>
  );
};
