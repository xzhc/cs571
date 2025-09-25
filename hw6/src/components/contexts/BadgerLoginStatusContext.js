import { createContext } from "react";

const BadgerLoginStatusContext = createContext([
  {
    loginStatus: false,
    username: "",
    setLoginStatus: () => {},
    setUsername: () => {},
  },
]);

export default BadgerLoginStatusContext;
