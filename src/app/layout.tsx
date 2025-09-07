import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import { MantineProvider } from "@mantine/core";
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from "@mantine/notifications";

const monstserrat  = Roboto({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['100', '200', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: "Rede Busca",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
          className={` ${monstserrat.className}`}
        suppressHydrationWarning={true}
      >
        <Header />
         <MantineProvider>
           <Notifications />
          {children}
         </MantineProvider>
      </body>
    </html>
  );
}
