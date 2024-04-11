import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Navbar() {
  const { auth, logout } = useAuth();
  React.useEffect(() => {
    console.log("hello");
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#3993C3ff" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img
              src="/images/ACMLogo.png"
              alt="acm"
              width="55px"
              height="55px"
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ACM VNRVJIET
          </Typography>
          {auth.token ? (
            auth.role === "user" ? (
              <div className="flex flex-row space-x-6">
                <Link to="/membership">
                  <Typography variant="h6" component="div">
                    Membership
                  </Typography>
                </Link>
                <Link to="/profile">
                  <Typography variant="h6" component="div">
                    Profile
                  </Typography>
                </Link>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </Typography>
              </div>
            ) : auth.role === "admin" ? (
              <>
                <div className="flex flex-row space-x-6">
                  <Link to="/add-event">
                    <Typography variant="h6" component="div">
                      Student List
                    </Typography>
                  </Link>

                  <Link to="/profile">
                    <Typography variant="h6" component="div">
                      Membership
                    </Typography>
                  </Link>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row space-x-6">
                  <Link to="/add-event">
                    <Typography variant="h6" component="div">
                      Add Event
                    </Typography>
                  </Link>

                  <Link to="/profile">
                    <Typography variant="h6" component="div">
                      Profile
                    </Typography>
                  </Link>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </div>
              </>
            )
          ) : (
            <>
              <Link to="/login">
                <Typography variant="h6" component="div">
                  Login
                </Typography>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
