//import from libraries
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

//internal imports
import { CredentialsType } from "@/types/types";
import User from "@/models/User";
import { connectMongoDB } from "@/lib/mongodb/mongodb";

//create authentifications options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { username, password } = credentials as CredentialsType;
        try {
          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!username) {
            return null;
          }

          if (!password) {
            return null;
          }

          const hashedPassword = await bcrypt.compare(password, user.password);

          if (!hashedPassword) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Error " + error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          // write to session's token user's id and surname
          ...token,
          id: user.id,
          surname: user.surname,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // write to session user's id and surname
      session.user.id = token.id;
      session.user.surname = token.surname;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
