import { Avatar } from "@mui/material";
import {
  Search as SearchIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import { Navbar, Nav } from "react-bootstrap";
// import { getUsernameFromToken } from '../api/users.api'
// import { useEffect, useState } from "react";

export function NavbarComponent() {

  // const [username, setUsername] = useState(null);

  // useEffect(() => {
    // Obtener el nombre de usuario cuando el componente se monta
  //   const authToken = localStorage.getItem('token');
  //   const user = getUsernameFromToken(authToken);
  //   setUsername(user);
  // }, []);

  return (
    <Navbar
      className="header"
      style={{ backgroundColor: "#1976D2" }}
      variant="dark"
    >
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Navbar.Brand
          href="/notes"
          className="brand-style"
          style={{ marginLeft: "20px" }}
        >
          NoteNexus
        </Navbar.Brand>
      </div>
      <Nav className="align-center">
        <Nav.Link className="icon-container-navbar" href="/">
          <ViewModuleIcon fontSize="large" />
        </Nav.Link>
        <Nav.Link className="icon-container-navbar" href="/">
          <SearchIcon fontSize="large" />
        </Nav.Link>
        <Nav.Link href="/">
          <Avatar
            alt="Remy Sharp"
            src="/public/images/1.jpg"
            style={{ marginRight: "10px" }}
          />
        </Nav.Link>
        
        {/* {username && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px" }}>{username}</span>
            <Avatar
              alt="User Avatar"
              src="http://localhost:3000/api/v1/users/admin/avatar"
              style={{ marginRight: "10px" }}
            />
          </div>
        )} */}

      </Nav>
    </Navbar>
  )
}
