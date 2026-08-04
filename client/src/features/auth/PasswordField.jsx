import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/** A TextField for passwords with a show/hide toggle. */
export const PasswordField = ({
  label = "Password",
  value,
  onChange,
  error,
  helperText,
  autoComplete,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      label={label}
      type={visible ? "text" : "password"}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      required
      error={error}
      helperText={helperText}
      autoComplete={autoComplete}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={visible ? "Hide password" : "Show password"}
              onClick={() => setVisible((prev) => !prev)}
              edge="end"
              size="small"
            >
              {visible ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
