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
import AlertDeleting from "./AlertYesNo";

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
            router.push(`/to-do/${props.id}?filter=deleted`);
          } else if (status === "completed") {
            router.push(`/to-do/${props.id}?filter=completed`);
          } else {
            router.push(`/to-do/${props.id}?filter=active`);
          }
          props.setDisabled(false);
        });
      });
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="end" gap={2}>
      {props.status === "deleted" || props.status === "completed" ? (
        <>
          <Button
            onClick={() => handleUpdate("active")}
            disabled={props.disabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path
                fillRule="evenodd"
                d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
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
            title="Are You sure?"
            content="If You delete this ToDo, You never come back to it again!"
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            handleDo={handleDelete}
          />
        </>
      ) : (
        <>
          <Button
            variant="contained"
            disabled={
              props.disabled || !props.isChanged || props.status === "completed"
            }
            onClick={() => handleUpdate()}
          >
            Submit
          </Button>
          <Button
            onClick={() => handleUpdate("completed")}
            disabled={props.disabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
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
        </>
      )}
    </Box>
  );
};

export default Header;
