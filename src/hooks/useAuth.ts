import { useState } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const isLoggedin = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("is-login");
      setIsLogin(item === "true");
    }
  };

  //   const redirectTo = (link: string) => {
  //     router.push(link);
  //   };

  const isLogOut = () => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem("is-login", "false");
      //   redirectTo("/auth/login");
    }
  };

  return { isLoggedin, isLogin, isLogOut };
};
