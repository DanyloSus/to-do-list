// internal imports
import { setHamburger } from "@/lib/redux/responsive/features/hamSlice";

//import from libraries
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

type Props = {
  disabled: boolean;
};

const ReturnButton = (props: Props) => {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(setHamburger(true))}
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
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </Button>
  );
};

export default ReturnButton;
