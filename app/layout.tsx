//internal imports
import AuthProvider from "@/elements/AuthProvider";
import { ChildrenType } from "@/types/types";
//import styles
import "./globals.css";
import LightProvider from "@/elements/lightProvider";
import { DM_Sans, DM_Serif_Display } from "next/font/google";

//export site's metadata
export const metadata = {
  title: "To Do App",
  description: "Web app to create to do lists and things",
};

// preload font
const dm_sams = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans", // variable in css
});

// preload font
const dm_serif_display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif", // variable in css
});

export default function RootLayout({ children }: ChildrenType) {
  return (
    <html lang="en">
      <body className={`${dm_sams.variable} ${dm_serif_display.variable}`}>
        <LightProvider>
          <AuthProvider>{children}</AuthProvider>
        </LightProvider>
      </body>
    </html>
  );
}
