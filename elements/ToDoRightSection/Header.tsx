//internal import
import { setToDos } from "@/lib/redux/todos/features/todosSlice";

//import from libraries
import axios from "axios";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Dispatch, SetStateAction } from "react";

import { useDispatch } from "react-redux";
import { setToDosHandle } from "../TodoElements/TodoList";

//type of Header's props
type Props = {
  id: string;
  content: string;
  heading: string;
  isChanged: boolean;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
};

const Header = (props: Props) => {
  const router = useRouter();

  //get session
  const { data: session } = useSession();

  const dispatch = useDispatch();

  //function for deleting
  function handleDelete() {
    axios.delete(`/api/todos?id=${props.id}`).finally(() => {
      //set new ToDos
      setToDosHandle(session?.user.id, dispatch).then(() => {
        router.push("/to-do");
      });
    });
  }

  //function for updating
  function handleUpdate() {
    props.setIsChanged(false);

    axios
      .put(`/api/todos/${props.id}`, {
        newHeading: props.heading,
        newContent: props.content,
        attachedId: session?.user.id,
      })
      .finally(() => {
        setToDosHandle(session?.user.id, dispatch);
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
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </Box>
  );
};

export default Header;
