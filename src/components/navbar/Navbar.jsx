import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) => ({
    color: "#ffffff",
    textDecoration: "none",
    marginRight: "25px",
    fontSize: "16px",
    fontWeight: "500",
    paddingBottom: "6px",
    borderBottom: isActive ? "3px solid #f9bf29" : "3px solid transparent",
    transition: "0.3s",
  });


  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [displayName, setDisplayName] = useState("");

  const readUserName = () => {
    const direct = localStorage.getItem("userName");
    if (direct) return direct;

    const raw = localStorage.getItem("user");
    if (!raw) return "";
    try {
      const u = JSON.parse(raw);
      return (
        u?.fullName ||
        u?.userName ||
        u?.name ||
        u?.email ||
        ""
      );
    } catch {
      return "";
    }
  };

  useEffect(() => {
    const sync = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setDisplayName(readUserName());
    };

    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setDisplayName("");
    navigate("/auth/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "#3b5d50", py: 1 }}
    >
      <Toolbar sx={{ maxWidth: "1200px", width: "100%", mx: "auto" }}>
        <Typography
          component={NavLink}
          to="/home"
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            mr: 6,
            textDecoration: "none",
          }}
        >
          Furni
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <NavLink to="/home" style={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/shop" style={linkStyle}>
            Shop
          </NavLink>

          <NavLink to="/categories" style={linkStyle}>
            Categories
          </NavLink>

          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>

          <NavLink to="/services" style={linkStyle}>
            Services
          </NavLink>

          <NavLink to="/blog" style={linkStyle}>
            Blog
          </NavLink>

          <NavLink to="/contact" style={linkStyle}>
            Contact
          </NavLink>
        </Box>

        {isLoggedIn ? (
          <>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                mr: 2,
                maxWidth: 220,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={displayName || "User"}
            >
              {displayName ? `Hi, ${displayName}` : "Hi, User"}
            </Typography>

            <Button
              onClick={handleLogout}
              sx={{
                bgcolor: "#f9bf29",
                color: "#1a1a1a",
                textTransform: "none",
                fontWeight: 700,
                mr: 2,
                borderRadius: 999,
                px: 2.2,
                "&:hover": { backgroundColor: "#f0b51f" },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              component={NavLink}
              to="/auth/login"
              sx={{
                color: "#fff",
                textTransform: "none",
                fontWeight: "500",
                mr: 1,
              }}
            >
              Login
            </Button>

            <Button
              component={NavLink}
              to="/auth/register"
              sx={{
                color: "#fff",
                textTransform: "none",
                fontWeight: "500",
                mr: 2,
              }}
            >
              Register
            </Button>
          </>
        )}

        <IconButton component={NavLink} to="/cart" sx={{ color: "#fff" }}>
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
