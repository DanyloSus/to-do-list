// styled needs USR
"use client";

//import from libraries
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";

// responsive wrapper of todos' list
export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  zIndex: "10",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "365px",
    width: "100%",
    height: "100%",
    maxHeight: "100vh",
    border: `1px solid ${grey[300]}`,
    left: "0px",
    top: "0px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
    height: "100vh",
  },
}));
