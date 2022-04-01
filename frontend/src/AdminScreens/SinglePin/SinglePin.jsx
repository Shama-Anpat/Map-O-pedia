import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./EditPin.css";
import {
  deletePin,
  clearErrors,
  updatePin,
  getPinDetails,
} from "../../actions/pinsActions";
import ReactMarkdown from "react-markdown";
import { UPDATE_PINS_RESET } from "../../constants/pinsConstants";
import { useAlert } from "react-alert";

function SinglePin({ match, history }) {
  // const dispatch = useDispatch();

  // const pinUpdate = useSelector((state) => state.pinUpdate);
  // const { loading: loadingUpdate, error: errorUpdate } = pinUpdate;

  // const pinDelete = useSelector((state) => state.pinDelete);
  // const { loading: loadingDelete, error: errorDelete } = pinDelete;

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, pin } = useSelector((state) => state.pinDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.pin);

  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [date, setDate] = useState("");

  const types = ["tree", "mountain", "forest", "temple", "fort"];

  const pinId = match.params.id;

  useEffect(() => {
    if (pin && pin._id !== pinId) {
      dispatch(getPinDetails(pinId));
    } else {
      setPlace(pin.place);
      setDesc(pin.desc);
      setLat(pin.lat);
      setLong(pin.long);
      setType(pin.type);
      setDate(pin.createdAt);
      setOldImages(pin.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Pin Updated Successfully");
      history.push("/map");
      dispatch({ type: UPDATE_PINS_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    pinId,
    pin,
    updateError,
    date,
  ]);

  const updatePinSubmitHandler = (e) => {
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
    dispatch(updatePin(pinId, myForm));
  };

  const updatePinImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePin(id));
    }
    history.push("/pins");
  };

  // useEffect(() => {
  //   const fetching = async () => {
  //     const { data } = await axios.get(`/api/pins/${match.params.id}`);
  //     setPlace(data.place);
  //     setDesc(data.desc);
  //     setLat(data.lat);
  //     setLong(data.long);
  //     setType(data.type);
  //     setDate(data.updatedAt);
  //   };

  //   fetching();
  // }, [match.params.id, date]);

  // const resetHandler = () => {
  //   setTitle("");
  //   setDesc("");
  //   setLat("");
  //   setLong("");
  //   setType("");
  // };

  // const updateHandler = (e) => {
  //   if (window.confirm("Are you sure?")) {
  //     e.preventDefault();
  //     dispatch(updatePin(match.params.id, title, desc, lat, long, type));
  //     if (!title || !desc || !lat || !long || !type) return;
  //     resetHandler();
  //   }
  //   history.push("/pins");
  // };

  return (
    <MainScreen title="Edit Pin">
      <Card>
        <Card.Header>Edit your Pin</Card.Header>
        <Card.Body>
          <Form encType="multipart/form-data" onSubmit={updatePinSubmitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="desc">
              <Form.Label>Information</Form.Label>
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
                onChange={updatePinImagesChange}
                multiple
              />
            </Form.Group>
            <Form.Group controlId="displayimages">
              <div id="createPinFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="Old Pin Preview" />
                  ))}
              </div>

              <div id="createPinFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Pin Preview" />
                ))}
              </div>
            </Form.Group>
            <Button
              className="mx-2"
              style={{ marginTop: 10 }}
              variant="primary"
              type="submit"
              disabled={loading ? true : false}
            >
              Update Pin
            </Button>
            <Button
              className="mx-2"
              style={{ marginTop: 10 }}
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Pin
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substr(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SinglePin;
