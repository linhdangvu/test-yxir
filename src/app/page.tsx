"use client";

import React from "react";
import DashboardPage from "@/components/app/dashboard/dashboard";
import { useRouter } from "next/navigation";
import Button from "@/components/base/button/button";

const HomePage = () => {
  const router = useRouter();
  return (
    <div>
      <DashboardPage />
    </div>
  );
};

export default HomePage;
