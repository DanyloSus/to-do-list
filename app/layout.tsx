//internal imports
import AuthProvider from "@/elements/AuthProvider";
import ThemeProviderElement from "@/elements/ThemeProviderElement";
import { ChildrenType } from "@/types/types";
//import styles
import "./globals.css";

//export site's metadata
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: ChildrenType) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderElement>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProviderElement>
      </body>
    </html>
  );
}
