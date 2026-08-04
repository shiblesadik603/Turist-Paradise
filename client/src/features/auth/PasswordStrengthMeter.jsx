import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getPasswordRules, getPasswordStrength } from "../../utils/validators";

const SEGMENT_COLORS = ["#e2e8f0", "#ef4444", "#f59e0b", "#eab308", "#22c55e"];

/** Segmented strength bar + live checklist, driven by the same rules the server enforces. */
export const PasswordStrengthMeter = ({ password }) => {
  if (!password) return null;

  const rules = getPasswordRules(password);
  const { score, label } = getPasswordStrength(password);

  return (
    <Box sx={{ mt: 1, mb: 1 }}>
      <Box sx={{ display: "flex", gap: 0.5, mb: 0.75 }}>
        {[1, 2, 3, 4].map((segment) => (
          <Box
            key={segment}
            sx={{
              height: 4,
              flex: 1,
              borderRadius: 2,
              backgroundColor: segment <= score ? SEGMENT_COLORS[score] : "#e2e8f0",
              transition: "background-color 0.2s ease",
            }}
          />
        ))}
      </Box>
      <Typography variant="caption" sx={{ color: SEGMENT_COLORS[score], fontWeight: 600 }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", mt: 0.75 }}>
        {rules.map((rule) => (
          <Box
            key={rule.label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: rule.met ? "#22c55e" : "text.secondary",
            }}
          >
            {rule.met ? (
              <CheckCircleIcon sx={{ fontSize: 14 }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ fontSize: 14 }} />
            )}
            <Typography variant="caption">{rule.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
