import React, { useContext, useEffect, useRef, useState } from "react";
import BadgerMessage from "./BadgerMessage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { Form, Button } from "react-bootstrap";
export default function BadgerChatroom(props) {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { loginStatus } = useContext(BadgerLoginStatusContext);

  const titleRef = useRef("");
  const contentRef = useRef("");
  const loadMessages = () => {
    fetch(
      `https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=1`,
      {
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
        //console.log(json);
      });
  };

  const messagesPerPage = 25;
  //const totalPages = Math.ceil(messages.length / messagesPerPage);
  const currentMessages = messages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  const pages = [1, 2, 3, 4];

  // Why can't we just say []?
  // The BadgerChatroom doesn't unload/reload when switching
  // chatrooms, only its props change! Try it yourself.
  useEffect(loadMessages, [props, currentPage]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!titleRef.current.value || !contentRef.current.value) {
      alert("You must provide both a title and content!");
      return;
    }

    fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        content: contentRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        loadMessages();
        //console.log(json);
      });
  }

  const handleDeletePost = (postId) => {
    setMessages(messages.filter((message) => message.id !== postId));
  };

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {/* TODO: Allow an authenticated user to create a post. */}
      {loginStatus ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label id="title">Post Title</Form.Label>
            <Form.Control type="text" ref={titleRef} id="title" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label id="content">Post Content</Form.Label>
            <Form.Control as="textarea" ref={contentRef} id="content" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Post
          </Button>
        </Form>
      ) : (
        <p>You must be logged in to post!</p>
      )}
      <hr />
      <Container>
        {currentMessages.length > 0 ? (
          <Row>
            {/* TODO: Complete displaying of messages. */}
            {messages.map((message) => (
              <Col
                key={message.id}
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                xxl={3}
              >
                <BadgerMessage {...message} onDelete={handleDeletePost} />
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            <p>There are no messages on this page yet!</p>
          </Row>
        )}
      </Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
          <Pagination>
            {pages.map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </>
  );
}
