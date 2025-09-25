import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BadgerLayout from "./BadgerLayout";
import BadgerLogin from "../auth/BadgerLogin";
import BadgerRegister from "../auth/BadgerRegister";
import BadgerLogout from "../auth/BadgerLogout";
import BadgerChatroom from "../content/BadgerChatroom";
import BadgerChatHome from "../content/BadgerChatHome";
import BadgerNoMatch from "../content/BadgerNoMatch";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerApp() {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/rest/s25/hw6/chatrooms", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setChatrooms(json);
        // console.log(json);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BadgerLayout chatrooms={chatrooms} />}>
          <Route index element={<BadgerChatHome />} />
          <Route path="/logout" element={<BadgerLogout />}></Route>
          <Route path="/login" element={<BadgerLogin />}></Route>
          <Route path="/register" element={<BadgerRegister />}></Route>

          {chatrooms.map((chatroom) => {
            return (
              <Route
                key={chatroom}
                path={`chatrooms/${chatroom}`}
                element={<BadgerChatroom name={chatroom} />}
              />
            );
          })}
          <Route path="*" element={<BadgerNoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default BadgerApp;
