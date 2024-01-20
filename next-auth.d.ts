import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    surname: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    surname: string;
  }

  interface Session {
    user: {
      /** The user's name. */
      surname: string;
      id: string;
    } & DefaultSession["user"];
  }
}
