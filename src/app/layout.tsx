import "src/components/shared/ui/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import "@uploadthing/react/styles.css";
import Menubar from "~/components/widgets/menubar/ui";

export const metadata: Metadata = {
  title: "Panel NUFL",
  description:
    "The NUFL Admin Panel is a interface designed for managing operations of the Nazarbayev University Football League (NUFL). Admin panel is a platform for administrators to handle various aspects of the league, including team and player management, game scheduling, scoring, and other statistical tracking.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex flex-row">
          <Menubar />
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
