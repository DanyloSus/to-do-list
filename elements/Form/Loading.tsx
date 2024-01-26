"use client";

//import from libraries
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

// create custom textfield
const CustomCircularProgress = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "48px",
  height: "48px",
  marginTop: "-24px",
  marginLeft: "-24px",
});

const Loading = () => {
  return <CustomCircularProgress size={48} />;
};

export default Loading;
