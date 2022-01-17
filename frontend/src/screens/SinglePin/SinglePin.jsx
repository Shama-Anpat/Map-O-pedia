import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePinAction, updatePinAction } from "../../actions/pinsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SinglePin({ match, history }) {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const pinUpdate = useSelector((state) => state.pinUpdate);
  const { loading, error } = pinUpdate;

  const pinDelete = useSelector((state) => state.pinDelete);
  const { loading: loadingDelete, error: errorDelete } = pinDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePinAction(id));
    }
    history.push("/pins");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/pin/${match.params.id}`);

      setTitle(data.title);
      setDesc(data.desc);
      setLat(data.lat);
      setLong(data.long);
      setType(data.type);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setDesc("");
    setLat("");
    setLong("");
    setType("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updatePinAction(match.params.id, title, desc, lat, long, type));
    if (!title || !desc || !lat || !long || !type) return;

    resetHandler();
    history.push("/pins");
  };

  return (
    <MainScreen title="Edit Pin">
      <Card>
        <Card.Header>Edit your Pin</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
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
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SinglePin;
