"use client";

import Loading from "@/elements/Form/Loading";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PageButtons = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGuest = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      username: "admin",
      password: "eKmvL3954dbpmTyrcnFN",
      redirect: false,
    }).catch((err) => console.log(err));
    if (!res?.ok) {
      setLoading(false);
      return;
    }

    router.replace("to-do");
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap="3rem">
      <Button disabled={loading} variant="text" onClick={() => handleGuest()}>
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
