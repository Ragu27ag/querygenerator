import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <div>
      {" "}
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="secondary" size="8rem" />
      </Box>
    </div>
  );
};

export default Loader;
