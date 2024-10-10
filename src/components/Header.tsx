import React from "react";
import { Box, Toolbar, AppBar, Typography, Button } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";

const Header = () => {
  return (
    <Box className="grow">
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#3b3b3b" }}>
          <MovieIcon sx={{ color: "#efbf04", marginRight: "1rem" }} />
          <Typography
            sx={{ color: "#efbf04", flexGrow: 1 }}
            variant="h6"
            component="div"
            className="grow"
          >
            Movie Explorer
          </Typography>
          <Button sx={{ color: "#efbf04" }}>My favorites</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
