import { useState, useEffect } from 'react';
import { getAvatarUrl } from '../api/users.api';  // Asegúrate de actualizar la ruta a tu archivo api.js
import { Avatar } from "@mui/material";
import {
  Search as SearchIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavbarComponent() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      const url = await getAvatarUrl();
      setAvatarUrl(url);
    };
    fetchAvatarUrl();
  }, []);

  return (
    <Navbar
      className="header"
      style={{ backgroundColor: "#1976D2" }}
      variant="dark"
    >
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Navbar.Brand
          as={Link}
          to="/notes"
          className="brand-style"
          style={{ marginLeft: "20px" }}
        >
          NoteNexus
        </Navbar.Brand>
      </div>
      <Nav className="align-center">
        <Nav.Link as={Link} className="icon-container-navbar" to="#"> 
          <ViewModuleIcon fontSize="large" />
        </Nav.Link>
        <Nav.Link as={Link} className="icon-container-navbar" to="#"> 
          <SearchIcon fontSize="large" />
        </Nav.Link>
        <Nav.Link as={Link} to="/profile">
          <Avatar
            alt="User Avatar"
            src={avatarUrl}
            style={{ marginRight: "10px" }}
          />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
