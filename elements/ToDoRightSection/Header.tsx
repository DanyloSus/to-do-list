//import from libraries
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { Dispatch, SetStateAction, useState } from "react";

import AlertDeleting from "./AlertYesNo";
import SettingsAlert from "./SettingAlert";

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
  setDateTime: Dispatch<SetStateAction<Date | null | undefined>>;
  dateTime: Date | null | undefined;
  handleDelete: () => void;
  handleUpdate: (newStatus?: string) => void;
};

const Header = (props: Props) => {
  const [isOpenError, setIsOpenError] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  return (
    <Box display="flex" alignItems="center" justifyContent="end" gap={2}>
      {props.status === "deleted" || props.status === "completed" ? (
        <>
          <Button
            onClick={() => props.handleUpdate("active")}
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
          <Button
            onClick={() => setIsOpenError(true)}
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
          <AlertDeleting
            title="Are You sure?"
            content="If You delete this ToDo, You never come back to it again!"
            isOpen={isOpenError}
            handleClose={() => setIsOpenError(false)}
            handleDo={props.handleDelete}
          />
        </>
      ) : (
        <>
          <Button
            variant="contained"
            disabled={
              props.disabled || !props.isChanged || props.status === "completed"
            }
            onClick={() => props.handleUpdate()}
          >
            Submit
          </Button>
          <Button
            onClick={() => props.handleUpdate("completed")}
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
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </Button>
          <Button
            onClick={() => props.handleUpdate("deleted")}
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
          <Button
            disabled={props.disabled}
            onClick={() => setIsOpenSettings(true)}
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
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Button>
          <SettingsAlert
            setIsChanged={props.setIsChanged}
            isOpen={isOpenSettings}
            handleClose={() => setIsOpenSettings(false)}
            setDateTime={(e) => props.setDateTime(new Date(e!.toString()))}
            dateTime={props.dateTime}
          />
        </>
      )}
    </Box>
  );
};

export default Header;
