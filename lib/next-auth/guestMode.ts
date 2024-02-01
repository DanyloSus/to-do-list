import { signIn } from "next-auth/react";

export const handleGuest = async () => {
  const res = await signIn("credentials", {
    username: "admin",
    password: process.env.GUEST_PASSWORD,
    redirect: false,
  }).catch((err) => console.log(err));
  if (!res?.ok) {
    return;
  }
};
