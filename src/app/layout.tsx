import "src/components/shared/ui/styles/globals.css";
import "@uploadthing/react/styles.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";

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

type RootLayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactQueryProvider>
      <ClerkProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body className="relative flex flex-row bg-[#040404] text-white">
            <Menubar />
            <main className="flex-1">{children}</main>
            <Toaster />
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
