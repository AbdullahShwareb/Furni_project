import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#3b5d50", py: 1 }}>
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

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NavLink to="/home" style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/shop" style={linkStyle}>
            Shop
          </NavLink>
          <NavLink to="/about" style={linkStyle}>
            About us
          </NavLink>
          <NavLink to="/services" style={linkStyle}>
            Services
          </NavLink>
          <NavLink to="/blog" style={linkStyle}>
            Blog
          </NavLink>
          <NavLink to="/contact" style={linkStyle}>
            Contact us
          </NavLink>
        </Box>

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
          variant="contained"
          sx={{
            backgroundColor: "#ffffff",
            color: "#3b5d50",
            textTransform: "none",
            fontWeight: "600",
            mr: 2,
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          Register
        </Button>

        <IconButton component={NavLink} to="/cart" sx={{ color: "#fff" }}>
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
