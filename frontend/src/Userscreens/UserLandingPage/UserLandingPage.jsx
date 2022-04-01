import React, { useEffect, useState } from "react";
import { Button, Container, Jumbotron, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { clearErrors, login, userregister } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import "./UserLandingStyles.css";

function UserLandingPage({ history, props, location }) {
  // const userLogin = useSelector((state) => state.userLogin);
  // const { loading, error, userInfo } = userLogin;

  // const userRegister = useSelector((state) => state.userRegister);
  // const { loading: registerloading, error: registererror } = userRegister;

  const [showlogin, setShowlogin] = useState(false);
  const handleCloseLogin = () => setShowlogin(false);
  const handleShowlogin = () => setShowlogin(true);

  const [showregister, setShowregister] = useState(false);
  const handleCloseRegister = () => setShowregister(false);
  const handleShowregister = () => setShowregister(true);

  // const [email, setEmail] = useState("");
  // const [firstName, setfirstName] = useState("");
  // const [lastName, setlastName] = useState("");
  // const [pic, setPic] = useState(
  //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  // );
  // const [password, setPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");

  // const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [message] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = user;

  const [avatar, setAvatar] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [avatarPreview, setAvatarPreview] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  // const postDetails = (pics) => {
  //   if (
  //     pics ===
  //     "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  //   ) {
  //     return setPicMessage("Please Select an Image");
  //   }
  //   setPicMessage(null);
  //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //     const data = new FormData();
  //     data.append("file", pics);
  //     data.append("upload_preset", "Map-O-Pedia");
  //     data.append("cloud_name", "shama");
  //     fetch("https://api.cloudinary.com/v1_1/shama/image/upload", {
  //       method: "POST",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPic(data.url.toString());
  //         console.log(pic);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     return setPicMessage("Please Select an Image");
  //   }
  // };

  const submitHandlerlogin = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const submitHandlerregister = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("username", username);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(userregister(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/mynotes";
  // const submitHandlerregister = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmpassword) {
  //     setMessage("Passwords do not match");
  //   } else dispatch(userregister(firstName, lastName, email, password, pic));
  // };

  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/mynotes");
  //   }
  // }, [history, userInfo]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <div className="usermain">
      <Container>
        <Jumbotron className="userjumbotron">
          <p>
            Visitors that are eager to learn about historic places in India that
            may be an important part of the country's history but are not
            well-known to the world, or who are interested in the architecture,
            the events that took place, or the importance of sculptures can find
            out about them by simply visiting this website from the comfort of
            their home. It also provides the option of making notes of the
            points that are relevant to you and that you may require in the
            future.
          </p>

          <div className="userbuttonContainer">
            <Button
              variant="warning"
              size="lg"
              className="landingbutton"
              onClick={handleShowlogin}
            >
              <b>Login</b>
            </Button>

            <Button
              variant="outline-dark"
              size="lg"
              className="landingbutton"
              onClick={handleShowregister}
            >
              <b>Signup</b>
            </Button>
          </div>
        </Jumbotron>

        <Modal show={showlogin} onHide={handleCloseLogin}>
          <Modal.Body className="userloginmodal">
            <img
              className="icon-img"
              src="https://img.icons8.com/ios-filled/100/000000/checked-user-male.png"
              alt=""
            />
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandlerlogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={loginEmail}
                  placeholder="Enter email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={loginPassword}
                  placeholder="Password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicForgetPassword">
                <Link
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  to="/password/forgot"
                >
                  Forget Password ?
                </Link>
              </Form.Group>

              <Modal.Footer>
                <Button
                  variant="light"
                  style={{ marginTop: "30px" }}
                  onClick={handleCloseLogin}
                >
                  Close
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  style={{ marginTop: "30px" }}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showregister}
          onHide={handleCloseRegister}
        >
          <Modal.Body className="userloginmodal">
            <img
              className="icon-imgr"
              src="https://img.icons8.com/ios-glyphs/90/000000/edit-user-male.png"
              alt=""
            />
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}
            <Form
              encType="multipart/form-data"
              onSubmit={submitHandlerregister}
            >
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="username"
                  name="username"
                  value={username}
                  placeholder="Enter name"
                  onChange={registerDataChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={registerDataChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={registerDataChange}
                />
              </Form.Group>

              {/* {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )} */}
              <Form.Group className="mb-3" controlId="pic">
                <Form.Label>Profile Picture</Form.Label>
                <Form.File
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </Form.Group>

              <Modal.Footer>
                <Button
                  variant="light"
                  style={{ marginTop: "30px" }}
                  onClick={handleCloseRegister}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  style={{ marginTop: "30px" }}
                  type="submit"
                >
                  Register
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default UserLandingPage;
