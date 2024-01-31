"use client";

import { Box } from "@mui/material";
import grey from "@mui/material/colors/grey";
import { styled } from "@mui/material/styles";

export const Wrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    position: "absolute",
    top: "50%",
    left: "50%",
    border: `1px solid ${grey[400]}`,
    borderRadius: "1rem",
    padding: "5rem",
    width: "500px",
    transform: "translate(-50%,-50%)",
  },
  [theme.breakpoints.down("sm")]: {
    overflow: "hidden",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
