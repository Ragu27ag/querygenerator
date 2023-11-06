import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "../Axios/axios.js";
import { Outlet } from "react-router-dom";

const MainHome = () => {
  const chk = React.useCallback(async () => {
    await axios.get("/health");
  }, []);

  React.useEffect(() => {
    chk();
  }, [chk]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Insert Query Generator
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ margin: "20px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default MainHome;
