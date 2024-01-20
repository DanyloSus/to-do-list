import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

import { JWT } from "next-auth/jwt";

// change type of JWT token in callback
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    surname: string;
  }
}

// change type of User and Session in callback
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    surname: string;
  }

  interface Session {
    user: {
      surname: string;
      id: string;
    } & DefaultSession["user"];
  }
}
