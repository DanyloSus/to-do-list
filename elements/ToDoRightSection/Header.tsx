"use client";

import { setToDos } from "@/lib/redux/todos/features/todosSlice";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

interface Props {
  id: string;
  content: string;
  heading: string;
  isChanged: boolean;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const Header = (props: Props) => {
  const router = useRouter();

  const { data: session } = useSession();

  const dispatch = useDispatch();

  function handleDelete() {
    axios.delete(`/api/todos?id=${props.id}`).finally(() => {
      axios
        .get(`/api/todos?attachedId=${session?.user.id}`)
        .then((res) => dispatch(setToDos(res.data.toDos)))
        .finally(() => router.push("/to-do"));
    });
  }

  function handleUpdate() {
    props.setIsChanged(false);

    axios
      .put(`/api/todos/${props.id}`, {
        newHeading: props.heading,
        newContent: props.content,
        attachedId: session?.user.id,
      })
      .finally(() => {
        axios
          .get(`/api/todos?attachedId=${session?.user.id}`)
          .then((res) => dispatch(setToDos(res.data.toDos)));
      });
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="end" gap={2}>
      <Button
        variant="contained"
        disabled={!props.isChanged}
        onClick={handleUpdate}
      >
        Submit
      </Button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        onClick={handleDelete}
      >
        <path
          strokeLinecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </Box>
  );
};

export default Header;
