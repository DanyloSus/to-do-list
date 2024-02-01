// states need CSR
"use client";

//import from libraries
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { Box, Button, Typography } from "@mui/material";

const TypingElement = () => {
  const [query, setQuery] = useState(0); // state of query
  const [text, setText] = useState(""); // value of query

  useEffect(() => {
    switch (query) {
      case 0:
        setText("Welcome to the To Do List");
        break;
      case 1:
        setText("Set Timers");
        break;
      case 2:
        setText("Filter To Do things");
        break;
      case 3:
        setText("Write a MarkDown code");
        break;
      case 4:
        setText("Have a good day");
        break;
      case 5:
        setText("Heading of main page");
        break;
      default:
        setText("I don't know what to write");
        break;
    }
  }, [query]);

  const handleChange = () => {
    setQuery((value) => value + 1);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box ml="auto">
        <Button onClick={handleChange}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </Button>
        <Button onClick={handleChange}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </Box>
      <Typography component="h1" variant="h2" fontWeight="700">
        <ReactTyped strings={[text]} typeSpeed={100} />
      </Typography>
    </Box>
  );
};

export default TypingElement;
