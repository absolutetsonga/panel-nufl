import "src/components/shared/ui/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import Menubar from "~/components/widgets/menubar/ui";
import { Toaster } from "~/components/shared/ui/sonner";

import { ReactQueryProvider } from "~/components/app/providers/query";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Panel NUFL",
  description:
    "The NUFL Admin Panel is a interface designed for managing operations of the Nazarbayev University Football League (NUFL). Admin panel is a platform for administrators to handle various aspects of the league, including team and player management, game scheduling, scoring, and other statistical tracking.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ClerkProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body className="flex flex-row">
            <Menubar />
            <main className="flex-1">
              {children}
              {modal}
              <div id="modal-root" />
            </main>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
