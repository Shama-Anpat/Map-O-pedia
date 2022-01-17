import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deletePinAction, listPins } from "../../actions/pinsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function Pins({ history, search }) {
  const dispatch = useDispatch();

  const pinList = useSelector((state) => state.pinList);
  const { loading, error, pins } = pinList;

  // const filteredPins = pins.filter((pin) =>
  //   pin.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const pinDelete = useSelector((state) => state.pinDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = pinDelete;

  const pinCreate = useSelector((state) => state.pinCreate);
  const { success: successCreate } = pinCreate;

  const pinUpdate = useSelector((state) => state.pinUpdate);
  const { success: successUpdate } = pinUpdate;

  useEffect(() => {
    dispatch(listPins());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePinAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(pins)}
      <Link to="/createpin">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Pin
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {pins &&
        pins
          .filter((filteredPins) =>
            filteredPins.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((pin) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={pin._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {pin.title}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/pin/${pin._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(pin._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">Category - {pin.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{pin.desc}</ReactMarkdown>
                      <h3>{pin.lat}</h3>
                      <h3>{pin.long}</h3>
                      <ReactMarkdown>{pin.type}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {pin.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default Pins;
