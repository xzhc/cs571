import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerMessage(props) {
  const { username } = useContext(BadgerLoginStatusContext);
  const dt = new Date(props.created);

  function handleDelete() {
    fetch(`https://cs571.org/rest/s25/hw6/messages?id=${props.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then(props.onDelete(props.id));
  }
  return (
    <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
      <h2>{props.title}</h2>
      <sub>
        Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
      </sub>
      <br />
      <i>{props.poster}</i>
      <p>{props.content}</p>

      {username === props.poster && (
        <Button variant="danger" onClick={handleDelete}>
          Delete Post
        </Button>
      )}
    </Card>
  );
}

export default BadgerMessage;
