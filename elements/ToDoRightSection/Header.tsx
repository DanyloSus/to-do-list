"use client";

import { deleteTodo } from "@/lib/features/todos/todosSlice";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const Header = (props: { slug: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  function handleDelete() {
    dispatch(deleteTodo({ id: props.slug }));
    router.push("/to-do");
  }

  return (
    <Box>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        onClick={handleDelete}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </Box>
  );
};

export default Header;
