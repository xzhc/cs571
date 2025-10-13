import { useCallback, useMemo } from "react";
import Comment from "./Comment";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useComments } from "../hooks/useComments";
import { useForm } from "../hooks/useForm";

export default function CommentBoard() {
  //use custom hooks to manage Auth and Comments
  const auth = useAuth();
  const comments = useComments();

  //use custom hook to manage loginForm and commentForm
  const loginForm = useForm({ username: "", password: "" });
  const commentForm = useForm({ comment: "" });

  // Note! You should use this in combination with sessionStorage.
  // Otherwise, when the user refreshes the page, it will go away!

  // const refreshComments = useCallback(async () => {
  //   await comments.fetchComments();
  // }, [comments]);

  const handleLoginSubmit = useCallback(
    async (e) => {
      e?.preventDefault();

      await auth.login(loginForm.values.username, loginForm.values.password);
    },
    [auth, loginForm.values]
  );

  const handleCommentSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      const success = await comments.addComment(commentForm.values.comment);
      if (success) {
        commentForm.resetForm();
      }
    },
    [comments, commentForm]
  );

  const handleLogout = useCallback(async () => {
    await auth.logout();
  }, [auth]);

  // useEffect(() => {
  //   refreshComments();
  // }, [refreshComments]);

  const commentList = useMemo(
    () => (
      <Container fluid>
        <Row>
          {comments.comments.map((c) => (
            <Col key={c.id} xs={12} lg={6} xl={4} xxl={3}>
              <Comment {...c} />
            </Col>
          ))}
        </Row>
      </Container>
    ),
    [comments.comments]
  );

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Badger Comments</h1>
      <hr />
      <Container fluid>
        <Row>
          <Col xs={12} md={6} lg={4} style={{ marginBottom: "1rem" }}>
            {auth.isLoggedIn ? (
              <>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
                <Form onSubmit={handleCommentSubmit}>
                  <Form.Label htmlFor="commentInput">Your Comment</Form.Label>
                  <Form.Control
                    id="commentInput"
                    name="comment"
                    value={commentForm.values.comment}
                    onChange={commentForm.handleChange}
                  ></Form.Control>
                  <br />
                  <Button type="submit">Post Comment</Button>
                </Form>
              </>
            ) : (
              <Form onSubmit={handleLoginSubmit}>
                <Form.Label htmlFor="usernameInput">Username</Form.Label>
                <Form.Control
                  id="usernameInput"
                  name="username"
                  value={loginForm.values.username}
                  onChange={loginForm.handleChange}
                ></Form.Control>
                <Form.Label htmlFor="passwordInput">Password</Form.Label>
                <Form.Control
                  id="passwordInput"
                  name="password"
                  type="password"
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange}
                ></Form.Control>
                <br />
                <Button type="submit">Login</Button>
              </Form>
            )}
          </Col>
          <Col xs={12} md={6} lg={8}>
            {commentList}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
