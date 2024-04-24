"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarPage from "@/components/base/sidebar/sidebar";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    auth.isLoggedin();
    console.log(pathname);
    // if (!auth.isLogin && !pathname.includes("auth")) {
    //   router.push("/auth/login");
    // }
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        {auth.isLogin ? (
          <div>
            <SidebarPage />
            <div className="p-4 sm:ml-64">{children} </div>
          </div>
        ) : (
          <div>{children} </div>
        )}
      </body>
    </html>
  );
}
