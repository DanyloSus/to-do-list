import { connectMongoDB } from "@/lib/mongodb/mongodb";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { NextAuthTypes } from "@/types/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { username, password } =
          credentials as NextAuthTypes.CredentialsType;
        try {
          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!username) {
            return null;
          }

          const checkedPassword = await bcrypt.compare(password, user.password);

          if (!checkedPassword) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          surname: user.surname,
        };
      }
      return token;
    },
    async session({ session, token }) {
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
