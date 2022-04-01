import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createPin } from "../../actions/pinsActions";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useAlert } from "react-alert";
import { NEW_PINS_RESET } from "../../constants/pinsConstants";

function CreatePin({ history }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newPin);

  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const types = ["tree", "mountain", "forest", "temple", "fort"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Pin Created Successfully");
      history.push("/map");
      dispatch({ type: NEW_PINS_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createPinSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("place", place);
    myForm.set("desc", desc);
    myForm.set("lat", lat);
    myForm.set("long", long);
    myForm.set("type", type);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createPin(myForm));
  };

  const createPinImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const resetHandler = () => {
    setPlace("");
    setDesc("");
    setLat("");
    setLong("");
    setType("");
    setImages("");
    setImagesPreview("");
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(createPin(title, desc, lat, long, type));
  //   if (!title || !desc || !lat || !long || !type) return;

  //   resetHandler();
  //   history.push("/pins");
  // };

  // useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Pin">
      <Card>
        <Card.Header>Create a new Pin</Card.Header>
        <Card.Body>
          <Form onSubmit={createPinSubmitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={place}
                placeholder="Enter the title"
                onChange={(e) => setPlace(e.target.value)}
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
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Choose Type</option>
                {types.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group controlId="images">
              <Form.Label>images</Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createPinImagesChange}
                multiple
              />
            </Form.Group>
            <Form.Group controlId="displayimages">
              <div id="createPinFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Pin Preview" />
                ))}
              </div>
            </Form.Group>
            <Button
              className="mx-2"
              style={{ marginTop: 10 }}
              type="submit"
              variant="primary"
              disabled={loading ? true : false}
            >
              Create Pin
            </Button>
            <Button
              className="mx-2"
              style={{ marginTop: 10 }}
              onClick={resetHandler}
              variant="danger"
            >
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
