// styled needs USR
"use client";

//import from libraries
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// responsive wrapper of ToDo right section
export const Wrapper = styled(Box)(({ theme }) => ({
  height: "100vh",
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    marginLeft: "365px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
  },
}));
