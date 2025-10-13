//思路：认证逻辑可以抽象为
//1.登陆函数
//2.登出函数
//3.认证状态

import { useCallback, useState } from "react";
import { useApi } from "./useApi";

//4. 检验认证状态
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { request } = useApi();

  const login = useCallback(
    async (username, password) => {
      try {
        await request("https://cs571.org/rest/s25/ice/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            //"X-CS571-ID": CS571.getBadgerId(),
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        setIsLoggedIn(true);
        return true;
      } catch (error) {
        alert("Invalid username or password.");
        return false;
      }
    },
    [request]
  );

  const logout = useCallback(async () => {
    try {
      await request("https://cs571.org/rest/s25/ice/logout", {
        method: "POST",
        credentials: "include",
      });
      alert("Logout successfully.");
      setIsLoggedIn(false);
      return true;
    } catch (error) {
      alert("Logout failed.");
      return false;
    }
  }, [request]);

  return { login, logout, isLoggedIn };
};
