import React, { useEffect, useState } from "react";
import { Button, Container, Jumbotron, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { clearErrors, adminregister, login } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import "./AdminLandingStyless.css";

function AdminLandingPage({ history, props, location }) {
  // const adminLogin = useSelector((state) => state.adminLogin);
  // const { loading, error, adminInfo } = adminLogin;

  // const adminRegister = useSelector((state) => state.adminRegister);
  // const { loading: registerloading, error: registererror } = adminRegister;

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
  // const [proof, setProof] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");
  // const [message, setMessage] = useState(null);
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

  const [proof, setProof] = useState("");
  const [proofPreview, setProofPreview] = useState("");

  // const proofDetails = (proofs) => {
  //   if (proofs.type === "image/jpeg" || proofs.type === "images/pdf") {
  //     const data = new FormData();
  //     data.append("file", proofs);
  //     data.append("upload_preset", "Map-O-Pedia");
  //     data.append("folder", "profile pics");
  //     data.append("cloud_name", "shama");
  //     fetch("https://api.cloudinary.com/v1_1/shama/image/upload", {
  //       method: "POST",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setProof(data.url.toString());
  //         console.log(proof);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     return setPicMessage("Please Select an proof");
  //   }
  // };

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
    myForm.set("proof", proof);
    dispatch(adminregister(myForm));
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
  const registerproofDataChange = (e) => {
    if (e.target.name === "proof") {
      const readers = new FileReader();

      readers.onload = () => {
        if (readers.readyState === 2) {
          setProofPreview(readers.result);
          setProof(readers.result);
        }
      };

      readers.readAsDataURL(e.target.files[0]);
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/mynotes";
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
    <div className="adminmain">
      <Container>
        <Jumbotron className="adminjumbotron">
          <p>
            A person who can contribute to sharing knowledge about the location
            by adding pins on the map. A mentor can also update or delete
            invalid pins. Additionally, a mentor can include a textual
            description of the place and also note the details they know to keep
            track of their knowledge.
          </p>

          <div className="adminbuttonContainer">
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
          <Modal.Body className="adminloginmodal">
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
          <Modal.Body className="adminloginmodal">
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
              <Form.Group className="mb-3" controlId="firstName">
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

              <Form.Group className="mb-3" controlId="pic">
                <Form.Label>Profile Picture</Form.Label>
                <Form.File
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="proof">
                <Form.Label>Upload Proof</Form.Label>
                <Form.File
                  type="file"
                  name="proof"
                  accept="image/*"
                  onChange={registerproofDataChange}
                />
                <Button style={{ marginTop: "30px" }} variant="danger">
                  Note : Once proof submitted cannot edit later !!
                </Button>
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

export default AdminLandingPage;
