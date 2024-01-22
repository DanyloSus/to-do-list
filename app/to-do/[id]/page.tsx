//useState needs client side
"use client";

//import from libraries
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";

//internal imports
import classes from "./../to-do.module.css";
import HeadingArea from "@/elements/ToDoRightSection/HeadingArea";
import ContentArea from "@/elements/ToDoRightSection/ContentArea";
import Header from "@/elements/ToDoRightSection/Header";
import { ParamsIdType } from "@/types/types";
import { Store } from "@/lib/redux/store";
import { setDisabled as setDisabledRedux } from "@/lib/redux/disabled/features/disabledSlice";

const Page = ({ params }: ParamsIdType) => {
  //state for checking is toDo thing was changed
  const [isChanged, setIsChanged] = useState(false);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [hasUser, setHasUser] = useState<null | boolean>(null);

  const { data: session } = useSession();

  //get all todos
  const todos = useSelector((state: Store) => state.todos);
  const disabled = useSelector((state: Store) => state.disbled);

  useEffect(() => {
    //filter todo by id
    const todo = todos.find((todo) => todo._id === params.id);

    if (todo?.attachedId === session?.user.id) {
      //set content of todo
      setHeading(todo?.heading || "");
      setContent(todo?.content || "");
      setHasUser(true);
    } else {
      setHasUser(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const dispatch = useDispatch();

  const setDisabled = (state: boolean) => {
    dispatch(setDisabledRedux(state));
  };

  return hasUser ? (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      <Header
        id={params.id}
        heading={heading}
        content={content}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
        disabled={disabled}
        setDisabled={setDisabled}
      />
      <hr />
      <HeadingArea
        id={params.id}
        heading={heading}
        setIsChanged={setIsChanged}
        setHeading={setHeading}
        disabled={disabled}
      />
      <hr />
      <ContentArea
        id={params.id}
        content={content}
        setIsChanged={setIsChanged}
        setContent={setContent}
        disabled={disabled}
      />
    </Box>
  ) : (
    // eslint-disable-next-line react/no-unescaped-entities
    <>To-Do doesn't exist</>
  );
};

export default Page;
