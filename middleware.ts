//import from libraries
export { default } from "next-auth/middleware";

//export config with matcher for exit if user isn't signed
export const config = { matcher: ["/to-do", "/to-do/:path*"] };
