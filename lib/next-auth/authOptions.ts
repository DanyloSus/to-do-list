//import from libraries
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

//internal imports
import { CredentialsType } from "@/types/types";
import User from "@/models/User";
import { connectMongoDB } from "@/lib/mongodb/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { username, password } = credentials as CredentialsType; // get values from credentials

        if (!username || !password) {
          // if some value is null or undefined then return null
          return null;
        }

        try {
          await connectMongoDB(); // connect to MongoDB
          const user = await User.findOne({ username }); // find user by username

          const isCorrectPasswords = await bcrypt.compare(
            // value of compared passwords of current password with hashed on server
            password,
            user.password
          );

          if (!isCorrectPasswords) {
            // if values are not equal then return null
            return null;
          }

          return user; // return user if everything is okay
        } catch (error) {
          console.log(error); // log if some error
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
