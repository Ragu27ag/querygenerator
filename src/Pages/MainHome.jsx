import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "../Axios/axios.js";
import { Outlet } from "react-router-dom";
import Loader from "../Components/Loader.jsx";

const MainHome = () => {
  const [load, setLoad] = React.useState(true);
  const chk = React.useCallback(async () => {
    const { data } = await axios.get("/health");
    if (data === "Running") {
      setLoad(false);
    }
  }, []);

  React.useEffect(() => {
    chk();
  }, [chk]);

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ backgroundColor: "#3500d3" }} position="static">
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
      )}
    </>
  );
};

export default MainHome;
