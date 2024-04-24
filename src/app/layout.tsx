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

  // get login status
  useEffect(() => {
    const logStatus = auth.isLoggedin();

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
        <div>
          {pathname.includes("auth") ? (
            <div>
              {loading ? (
                <div className="absolute left-1/3 top-1/4">
                  <TextLoading />
                </div>
              ) : (
                <div>{children} </div>
              )}
            </div>
          ) : (
            <div>
              <SidebarPage />
              {loading ? (
                <div className="absolute left-1/2 top-1/4">
                  <TextLoading />
                </div>
              ) : (
                <div className="p-4 sm:ml-64">{children} </div>
              )}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
