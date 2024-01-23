//internal import
import { setToDosHandle } from "../TodoElements/TodoList";

//import from libraries
import axios from "axios";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Dispatch, SetStateAction, useState } from "react";

import { useDispatch } from "react-redux";
import AlertDeleting from "./AlertDeleting";

//type of Header's props
type Props = {
  id: string;
  content: string;
  heading: string;
  status: string;
  isChanged: boolean;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: (state: boolean) => void;
};

const Header = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  console.log(props.status);

  //get session
  const { data: session } = useSession();

  const dispatch = useDispatch();

  //function for deleting
  function handleDelete() {
    props.setDisabled(true);
    axios.delete(`/api/todos?id=${props.id}`).finally(() => {
      //set new ToDos
      setToDosHandle(session?.user.id, dispatch).then(() => {
        router.push("/to-do");
        props.setDisabled(false);
      });
    });
  }

  //function for updating
  function handleUpdate(status = props.status) {
    props.setIsChanged(false);
    props.setDisabled(true);

    axios
      .put(`/api/todos/${props.id}`, {
        newHeading: props.heading,
        newContent: props.content,
        attachedId: session?.user.id,
        newStatus: status,
      })
      .finally(() => {
        setToDosHandle(session?.user.id, dispatch).finally(() => {
          if (status === "deleted") {
            router.push("/to-do?filter=deleted");
          }
          props.setDisabled(false);
        });
      });
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="end" gap={2}>
      <Button
        variant="contained"
        disabled={props.disabled || !props.isChanged}
        onClick={() => handleUpdate()}
      >
        Submit
      </Button>
      {props.status == "deleted" ? (
        <>
          <Button onClick={() => setIsOpen(true)} disabled={props.disabled}>
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
          <AlertDeleting
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            handleDo={handleDelete}
          />
        </>
      ) : (
        <Button
          onClick={() => handleUpdate("deleted")}
          disabled={props.disabled}
        >
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
      )}
    </Box>
  );
};

export default Header;
