import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  heading: String;
};

const Form = (props: Props) => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      border={`1px solid ${grey[400]}`}
      p={5}
      borderRadius={3}
      width="500px"
      sx={{ transform: "translate(-50%,-50%)" }}
    >
      <Typography
        variant="h4"
        fontWeight="700"
        component="h1"
        textAlign="center"
      >
        {props.heading}
      </Typography>
      {props.children}
    </Box>
  );
};

export default Form;
