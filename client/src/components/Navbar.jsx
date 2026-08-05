import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArticleIcon from "@mui/icons-material/Article";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth } from "../hooks/useAuth";
import * as usersApi from "../api/users.api";
import { resolveAvatarUrl } from "../utils/avatar";

const NAV_LINKS = [
  { to: "/home", label: "Home", icon: HomeIcon },
  { to: "/travelplan", label: "Trip Plan", icon: WorkIcon },
  { to: "/shop", label: "Shop", icon: StorefrontIcon },
  { to: "/blogs", label: "Blogs", icon: ArticleIcon },
];

const getInitials = (name) => {
  if (!name) return "?";
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
};

const navButtonSx = {
  color: "#fff",
  borderColor: "#fff",
  textTransform: "none",
  padding: "6px 15px",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "#fff",
  },
};

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userId, isAdmin, logout } = useAuth();
  const isOnShopPage = location.pathname === "/shop";

  const [profile, setProfile] = useState(null);
  const [navMenuAnchor, setNavMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }
    usersApi
      .getUser(userId)
      .then((response) => setProfile(response.data.data))
      .catch(() => setProfile(null));
  }, [userId]);

  const handleLogout = () => {
    setProfileMenuAnchor(null);
    setNavMenuAnchor(null);
    logout();
    navigate("/login");
  };

  const avatarSrc = resolveAvatarUrl(profile?.image);

  return (
    <AppBar sx={{ background: "linear-gradient(90deg, #16202b 0%, #2c3e50 100%)" }}>
      <Toolbar sx={{ gap: "6px" }}>
        {isAuthenticated && (
          <IconButton
            sx={{ display: { xs: "inline-flex", md: "none" }, color: "#fff" }}
            onClick={(e) => setNavMenuAnchor(e.currentTarget)}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h5"
          component={Link}
          to={isAuthenticated ? "/home" : "/login"}
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 800,
            marginRight: "24px",
          }}
        >
          Tourists
        </Typography>

        {isAuthenticated && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "2px" }}>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  startIcon={<link.icon fontSize="small" />}
                  sx={{
                    color: isActive ? "#e2b13c" : "#fff",
                    textTransform: "none",
                    fontWeight: isActive ? 700 : 500,
                    padding: "6px 14px",
                    "&:hover": {
                      color: "#e2b13c",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {isAuthenticated && isOnShopPage && (
          <Button
            variant="outlined"
            sx={{ ...navButtonSx, marginRight: "10px" }}
            component={Link}
            to="/cart"
          >
            <ShoppingCartIcon sx={{ marginRight: "5px" }} />
            My Cart
          </Button>
        )}

        {isAuthenticated ? (
          <>
            <IconButton
              onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
              sx={{ padding: "4px" }}
            >
              <Avatar
                src={avatarSrc || undefined}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#e2b13c",
                  color: "#16202b",
                  fontWeight: 700,
                  border: "2px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                {!avatarSrc && getInitials(profile?.name)}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={() => setProfileMenuAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                component={Link}
                to="/userprofile"
                onClick={() => setProfileMenuAnchor(null)}
              >
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                User Profile
              </MenuItem>
              {isAdmin && (
                <MenuItem component={Link} to="/admin" onClick={() => setProfileMenuAnchor(null)}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Admin Panel
                </MenuItem>
              )}
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

            <Menu
              anchorEl={navMenuAnchor}
              open={Boolean(navMenuAnchor)}
              onClose={() => setNavMenuAnchor(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {NAV_LINKS.map((link) => (
                <MenuItem
                  key={link.to}
                  component={Link}
                  to={link.to}
                  onClick={() => setNavMenuAnchor(null)}
                  selected={location.pathname === link.to}
                >
                  <ListItemIcon>
                    <link.icon fontSize="small" />
                  </ListItemIcon>
                  {link.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              sx={{ ...navButtonSx, marginRight: "10px" }}
              component={Link}
              to="/login"
            >
              <LoginIcon sx={{ marginRight: "5px" }} />
              Login
            </Button>
            <Button variant="outlined" sx={navButtonSx} component={Link} to="/signup">
              <PersonAddIcon sx={{ marginRight: "5px" }} />
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
