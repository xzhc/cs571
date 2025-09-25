import React, { useContext, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from "react-router";

export default function BadgerLogin() {
  // TODO Create the login component.

  const usernameRef = useRef();
  const passwordRef = useRef();

  const { setLoginStatus, setUsername } = useContext(BadgerLoginStatusContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("Logging in...");
    if (!usernameRef.current.value || !passwordRef.current.value) {
      alert("You must provide both a username and pin");
      return;
    }

    const passwordRegex = /^\d{7}$/;
    if (!passwordRegex.test(passwordRef.current.value)) {
      alert("You pin must be a 7-digit number!");
    }

    fetch("https://cs571.org/rest/s25/hw6/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": CS571.getBadgerId(),
      },
      body: JSON.stringify({
        username: usernameRef.current.value,
        pin: passwordRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "That username or pin is incorrect!") {
          alert("Incorrect username or pin!");
        } else {
          //alert("Login is successful!");
          setLoginStatus(true);
          setUsername(usernameRef.current.value);
          navigate("/");
        }
      });
  }
  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control type="text" ref={usernameRef} id="username" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} id="password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
