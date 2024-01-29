"use client";

import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const PageGuestButton = () => {
  const router = useRouter();
  const handleGuest = async () => {
    const res = await signIn("credentials", {
      username: "admin",
      password: "eKmvL3954dbpmTyrcnFN",
      redirect: false,
    }).catch((err) => console.log(err));
    if (!res?.ok) {
      return;
    }

    router.replace("to-do");
  };

  return (
    <Button variant="text" onClick={() => handleGuest()}>
      Guest
    </Button>
  );
};

export default PageGuestButton;
