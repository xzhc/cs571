import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from "../../assets/uw-crest.svg";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout(props) {
  // TODO @ Step 6:
  // You'll probably want to see if there is an existing
  // user in sessionStorage first. If so, that should
  // be your initial loginStatus state.
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem("loginStatus");
    const storedUsername = sessionStorage.getItem("username");
    if (storedLoginStatus === "true" && storedUsername) {
      setLoginStatus(true);
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("loginStatus", loginStatus);
    sessionStorage.setItem("username", username);
  }, [loginStatus, username]);

  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <BadgerLoginStatusContext.Provider
          value={{ loginStatus, setLoginStatus, username, setUsername }}
        >
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">
                <img
                  alt="BadgerChat Logo"
                  src={crest}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
                BadgerChat
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                {loginStatus ? (
                  <Nav.Link as={Link} to="logout">
                    Logout
                  </Nav.Link>
                ) : (
                  <>
                    <Nav.Link as={Link} to="login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="register">
                      Register
                    </Nav.Link>
                  </>
                )}
                <NavDropdown title="Chatrooms">
                  {
                    /* TODO Display a NavDropdown.Item for each chatroom that sends the user to that chatroom! */
                    props.chatrooms.map((chatroom, index) => {
                      return (
                        <NavDropdown.Item
                          as={Link}
                          to={`chatrooms/${chatroom}`}
                          key={index}
                        >
                          {chatroom}
                        </NavDropdown.Item>
                      );
                    })
                  }
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
          <Outlet />
        </BadgerLoginStatusContext.Provider>
      </div>
    </div>
  );
}

export default BadgerLayout;
