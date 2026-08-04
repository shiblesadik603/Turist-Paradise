const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => EMAIL_REGEX.test(email);

/** Same rules as the server: 8+ chars, upper, lower, number. Used to drive the strength meter. */
export const getPasswordRules = (password) => [
  { label: "At least 8 characters", met: password.length >= 8 },
  { label: "One uppercase letter", met: /[A-Z]/.test(password) },
  { label: "One lowercase letter", met: /[a-z]/.test(password) },
  { label: "One number", met: /[0-9]/.test(password) },
];

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "" };
  const metCount = getPasswordRules(password).filter((rule) => rule.met).length;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  return { score: metCount, label: labels[metCount] };
};
