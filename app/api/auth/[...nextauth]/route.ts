//import from libraries
import NextAuth from "next-auth/next";

//internal imports
import { authOptions } from "@/lib/next-auth/authOptions";

// create NextAuth's handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
