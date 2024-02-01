// use state needs USR
"use client";

//internal imports
import Loading from "@/elements/Form/Loading";
import { handleGuest } from "@/lib/next-auth/guestMode";

//import from libraries
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PageButtons = () => {
  // button's loading, on click
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // get router

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap="3rem">
      <Button
        disabled={loading}
        variant="text"
        onClick={() => handleGuest({ setLoading, router })}
      >
        Guest
      </Button>
      <Link href="/login">
        <Button disabled={loading} variant="outlined">
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button disabled={loading} variant="contained">
          Register
        </Button>
      </Link>
      {loading ? <Loading /> : null}
    </Box>
  );
};

export default PageButtons;
