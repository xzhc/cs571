import React, { useContext, useEffect } from "react";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from "react-router";

export default function BadgerLogout() {
  const { setLoginStatus, setUsername } = useContext(BadgerLoginStatusContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://cs571.org/rest/s25/hw6/logout", {
      method: "POST",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // Maybe you need to do something here?
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("loginStatus");

        setLoginStatus(false);
        setUsername("");

        navigate("/");
        alert("You have been logged out!");
        console.log(data);
      });
  }, []);

  return (
    <>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </>
  );
}
