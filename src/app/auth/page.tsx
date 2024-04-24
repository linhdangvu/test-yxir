"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Auth = () => {
  const router = useRouter();

  // Redirect to Login
  useEffect(() => {
    router.push("/auth/login");
  });
  return <div></div>;
};

export default Auth;
