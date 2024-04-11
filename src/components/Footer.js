import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0, background: "#3993C3ff", marginTop: 'auto' }}>
      <Toolbar>
        <Typography variant="body1" color="inherit" align="center" sx={{ flexGrow: 1 }}>
          © 2024 Your Website Name. All rights reserved.
        </Typography>
        <IconButton color="inherit" aria-label="github" href="https://github.com/your-github">
          <GitHubIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="instagram" href="https://instagram.com/your-instagram">
          <InstagramIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="linkedin" href="https://linkedin.com/your-linkedin">
          <LinkedInIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
