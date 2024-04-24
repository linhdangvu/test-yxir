"use client";

import React, { useEffect, useState } from "react";
import DashboardPage from "@/components/app/dashboard/dashboard";
import { useAuth } from "@/hooks/useAuth";
import TextLoading from "@/components/base/loading/text-loading";

const HomePage = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const logStatus = auth.isLoggedin();
    setLogin(logStatus);
    setLoading(false);
  });

  return (
    <div>
      {loading ? <TextLoading /> : <div>{isLogin && <DashboardPage />}</div>}
    </div>
  );
};

export default HomePage;
