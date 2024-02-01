//providers needs client side render
"use client";

//import from libraries
import { SessionProvider } from "next-auth/react";

//internal imports
import { ChildrenType } from "@/types/types";

const AuthProvider = ({ children }: ChildrenType) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
