import { useState } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);

  // check if is-login is on localStorage
  const isLoggedin = () => {
    if (typeof localStorage !== undefined) {
      const item = localStorage.getItem("is-login");
      setIsLogin(item === "true");
      return item === "true";
    }
    return false;
  };

  // set is-login on localStorage as false
  const isLogOut = () => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem("is-login", "false");
    }
  };

  return { isLoggedin, isLogin, isLogOut };
};
