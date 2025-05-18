// Navbar.js
import { Button, IconButton, Menu, MenuItem, Avatar, Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./navbar.css";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status Login
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(3); // Contoh jumlah item keranjang
  const [userDetails, setUserDetails] = useState(null); // Detail Pengguna
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah user sudah login
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user_details");
    if (token && user) {
      setIsLoggedIn(true);
      setUserDetails(JSON.parse(user)); // Parse data user dari localStorage
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('logout3')
    // Hapus token dan detail user dari localStorage
    axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
      }
    ).then(() =>{
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_details");
      setIsLoggedIn(false);
      setUserDetails(null);
      navigate("/login"); // Arahkan kembali ke halaman login
    }).catch(() =>{
      alert("erorr logout")
    })
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
      <img src={"logotrave"} alt="Logo" style={{ width: "150px", height: "auto" }} />

        {/* Menu Icon untuk Layar Kecil */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        {/* Navbar Links */}
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/page-destinasi">Destinations</Link></li>
            <li><Link to="/promo">Promo</Link></li>
          </ul>

          {/* Ikon Keranjang */}
          <IconButton component={Link} to="/Cart" color="inherit">
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Tombol Login & Daftar atau Dropdown Profil */}
          {isLoggedIn ? (
            // Tampilan Setelah Login
            <div>
              <IconButton onClick={handleProfileClick}>
                <Avatar
                  alt={userDetails?.name || "User"}
                  src={userDetails?.profilePictureUrl || ""}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileClose}
              >
                <MenuItem onClick={handleProfileClose}>
                  <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            // Tampilan Sebelum Login
            <div className="auth-buttons">
              <Button variant="contained" color="success">
                <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Masuk</Link>
              </Button>
              <Button variant="contained">
                <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Daftar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
