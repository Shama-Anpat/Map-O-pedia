import React, { useEffect } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useSelector } from "react-redux";
// import {
//   clearErrors,
//   updateProfile,
//   loadUser,
// } from "../../actions/userActions";
// import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Loading from "../../components/Loading";
// import ErrorMessage from "../../components/ErrorMessage";
// import { useAlert } from "react-alert";

const UserProfileScreen = ({ history }) => {
  // const [firstName, setfirstName] = useState("");
  // const [lastName, setlastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [pic, setPic] = useState();
  // const [password, setPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");

  // const [picMessage, setPicMessage] = useState();

  // const dispatch = useDispatch();

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const userUpdate = useSelector((state) => state.userUpdate);
  // const { loading, error, success } = userUpdate;

  // useEffect(() => {
  //   if (!userInfo) {
  //     history.push("/");
  //   } else {
  //     setfirstName(userInfo.firstName);
  //     setlastName(userInfo.lastName);
  //     setEmail(userInfo.email);
  //     setPassword(userInfo.password);
  //     setPic(userInfo.pic);
  //   }
  // }, [history, userInfo]);

  // const postDetails = (pics) => {
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

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmpassword) {
  //     setMessage("Passwords do not match");
  //   } else {
  //     dispatch(
  //       userupdateProfile({ firstName, lastName, email, password, pic })
  //     );
  //   }
  // };

  // const dispatch = useDispatch();
  // const alert = useAlert();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/");
    }
  }, [history, isAuthenticated]);

  // const { error, isUpdated, loading, success } = useSelector(
  //   (state) => state.profile
  // );

  // const [message] = useState(null);

  // const [username, setuserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState();
  // const [avatarPreview, setAvatarPreview] = useState(
  //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  // );

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   const myForm = new FormData();

  //   myForm.set("username", username);
  //   myForm.set("email", email);
  //   myForm.set("avatar", avatar);
  //   dispatch(updateProfile(myForm));
  // };

  // const updateProfileDataChange = (e) => {
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setAvatarPreview(reader.result);
  //       setAvatar(reader.result);
  //     }
  //   };

  //   reader.readAsDataURL(e.target.files[0]);
  // };

  // useEffect(() => {
  //   if (user) {
  //     setuserName(user.username);
  //     setEmail(user.email);
  //     setAvatarPreview(user.avatar.url);
  //   }

  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (isUpdated) {
  //     alert.success("Profile Updated Successfully");
  //     dispatch(loadUser());

  //     history.push("/profile");

  //     dispatch({
  //       type: UPDATE_PROFILE_RESET,
  //     });
  //   }
  // }, [dispatch, error, alert, history, user, isUpdated]);

  return (
    <MainScreen title={`${user.username}'s Profile`}>
      {loading ? (
        <Loading />
      ) : (
        <MainScreen>
          {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
          <div div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.username} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.username}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </MainScreen>
      )}
      {/* <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {message && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )}
              

              <Form.Group controlId="userName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="userName"
                  value={username}
                  placeholder="Enter name"
                  onChange={(e) => setuserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="avatarPreview">
                <Form.Label>Change Profile Picture</Form.Label>

                <Form.File
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
              </Form.Group>
              <Button
                type="submit"
                varient="primary"
                style={{ marginTop: "30px" }}
              >
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="profilePic"
            />
          </Col>
        </Row> */}
    </MainScreen>
  );
};

export default UserProfileScreen;
