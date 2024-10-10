import React from "react";
import { Box, Toolbar, IconButton, AppBar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <Box className="grow">
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#3b3b3b" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className="mr-2"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{ color: "#efbf04" }}
            variant="h6"
            component="div"
            className="grow"
          >
            Movie Explorer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
