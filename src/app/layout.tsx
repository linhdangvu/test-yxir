import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarPage from "@/components/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarPage />
        <div className="p-4 sm:ml-64">{children} </div>
      </body>
    </html>
  );
}
