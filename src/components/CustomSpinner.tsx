import React from "react";
import { CircularProgress } from "@mui/material";

const CustomSpinner = () => {
  return (
    <div className="flex justify-center">
      <CircularProgress sx={{ color: "grey.500" }} color="inherit" />
    </div>
  );
};

export default CustomSpinner;
