import { memo, useMemo } from "react";
import { Card } from "react-bootstrap";

const Comment = memo(function Comment(props) {
  console.log("I have rendered!");

  const createdDt = useMemo(() => new Date(props.created), [props.created]);

  return (
    <Card style={{ margin: "0.5rem" }}>
      <p>{props.comment}</p>
      <p>
        Posted on {createdDt.toLocaleDateString()} at{" "}
        {createdDt.toLocaleTimeString()} by {props.author}
      </p>
    </Card>
  );
});
export default Comment;
