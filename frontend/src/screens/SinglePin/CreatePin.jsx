import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPinAction } from "../../actions/pinsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreatePin({ history }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const pinCreate = useSelector((state) => state.pinCreate);
  const { loading, error, pin } = pinCreate;

  console.log(pin);

  const resetHandler = () => {
    setTitle("");
    setDesc("");
    setLat("");
    setLong("");
    setType("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPinAction(title, desc, lat, long, type));
    if (!title || !desc || !lat || !long || !type) return;

    resetHandler();
    history.push("/pins");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Pin">
      <Card>
        <Card.Header>Create a new Pin</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="desc">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={desc}
                placeholder="Enter the information"
                rows={4}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            {desc && (
              <Card>
                <Card.Header>Information Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{desc}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="lat">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="lat"
                value={lat}
                placeholder="Enter the Latitude"
                onChange={(e) => setLat(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="long">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="long"
                value={long}
                placeholder="Enter the Logitude"
                onChange={(e) => setLong(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="type"
                value={type}
                placeholder="Enter the Type"
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Pin
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreatePin;
