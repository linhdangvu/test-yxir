"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarPage from "@/components/base/sidebar/sidebar";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import TextLoading from "@/components/base/loading/text-loading";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // use hook
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();

  const [loading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);

  // get login status
  useEffect(() => {
    // setLoading(true);
    const logStatus = auth.isLoggedin();
    setLogin(logStatus);
    if (pathname.includes("auth")) {
      if (logStatus) {
        router.push("/");
      }
    } else {
      if (!logStatus) {
        router.push("/auth/login");
      }
    }

    setLoading(false);
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        {loading ? (
          <TextLoading />
        ) : (
          <div>
            {isLogin ? (
              <div>
                <SidebarPage />
                <div className="p-4 sm:ml-64">{children} </div>
              </div>
            ) : (
              <div>{children} </div>
            )}
          </div>
        )}
      </body>
    </html>
  );
}
