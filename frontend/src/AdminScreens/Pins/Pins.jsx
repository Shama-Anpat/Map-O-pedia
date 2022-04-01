import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, deletePin, getAdminPin } from "../../actions/pinsActions";
import ErrorMessage from "../../components/ErrorMessage";
import { useAlert } from "react-alert";
import { DELETE_PINS_RESET } from "../../constants/pinsConstants";

function Pins({ history, search }) {
  // const pinList = useSelector((state) => state.pinList);
  // const { loading, error, pins } = pinList;

  // const adminLogin = useSelector((state) => state.adminLogin);
  // const { adminInfo } = adminLogin;

  // const pinDelete = useSelector((state) => state.pinDelete);
  // const {
  //   loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = pinDelete;

  // const pinCreate = useSelector((state) => state.pinCreate);
  // const { success: successCreate } = pinCreate;

  // const pinUpdate = useSelector((state) => state.pinUpdate);
  // const { error: errorUpdate, success: successUpdate } = pinUpdate;

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, pins } = useSelector((state) => state.pins);

  // const filteredPins = pins.filter((pin) =>
  //   pin.title.toLowerCase().includes(search.toLowerCase())
  // );
  const { error: deleteError, isDeleted } = useSelector((state) => state.pin);

  const deletePinHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePin(id));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Pin Deleted Successfully");
      history.push("/pins");
      dispatch({ type: DELETE_PINS_RESET });
    }

    dispatch(getAdminPin());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  return (
    <MainScreen title={`Pins`}>
      <Link to="/createpin">
        <Button
          variant="warning"
          style={{ marginLeft: 10, marginBottom: 6 }}
          size="lg"
        >
          Create new Pin
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {pins &&
        pins
          // .filter((filteredPins) =>
          //   filteredPins.place.toLowerCase().includes(search.toLowerCase())
          // )
          .reverse()
          .map((pin) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={pin._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
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
                      {pin.place}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/admin/pin/${pin._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deletePinHandler(pin._id)}
                      // onClick={() =>
                      //   deleteProductHandler(params.getValue(params.id, "id"))
                      // }
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">Category - {pin.type}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{pin.desc}</ReactMarkdown>
                      <h3>{pin.lat}</h3>
                      <h3>{pin.long}</h3>
                      <ReactMarkdown>{pin.type}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {pin.createdAt.substr(0, 10)}
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
