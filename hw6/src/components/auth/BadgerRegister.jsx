import React, { useContext } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from "react-router";
export default function BadgerRegister() {
  // TODO Create the register component.
  const [username, setUsernsme] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepestPassword] = useState("");

  const { setLoginStatus, setUsername } = useContext(BadgerLoginStatusContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      alert("You must provide both a username and pin");
      return;
    }

    const passwordRegex = /^\d{7}$/;
    if (!passwordRegex.test(password)) {
      alert("You password must be 7-digit number!");
      return;
    }

    if (password !== repeatPassword) {
      alert("Your passwords do not match!");
      return;
    }

    fetch("https://cs571.org/rest/s25/hw6/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": CS571.getBadgerId(),
      },
      body: JSON.stringify({
        username: username,
        pin: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg.includes("already exists")) {
          alert("That username has already been taken!");
        } else {
          alert("Registered successfully!");
          setLoginStatus(true);
          setUsername(username);
          navigate("/");
        }
        // console.log(data);
      });
  }

  return (
    <>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsernsme(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="repeatPassword">Repeat Password</Form.Label>
          <Form.Control
            id="repeatPassword"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepestPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </>
  );
}
