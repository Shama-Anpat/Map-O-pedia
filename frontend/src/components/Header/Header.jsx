import React from "react";
// import { ReactNavbar } from "overlay-navbar";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { adminlogout } from "../../actions/adminActions";
// import { logout } from "../../actions/userActions";
import "../Header/Header.css";
// const options = {
//   burgerColorHover: "#eb4034",
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Map-O-Pedia",
//   link2Text: "Learn",
//   link3Text: "Educate",
//   link4Text: "Map",
//   link1Url: "/",
//   link2Url: "/users/landing",
//   link3Url: "/admin/landing",
//   link4Url: "/map",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
// };

function Header({ setSearch }) {
  // return <ReactNavbar {...options} />;
  // const dispatch = useDispatch();
  // const login = useSelector((state) => state.login);
  // const { user } = login;
  // const adminLogin = useSelector((state) => state.adminLogin);
  // const { adminInfo } = adminLogin;
  // const adminlogoutHandler = () => {
  //   dispatch(adminlogout());
  // };
  // const userlogoutHandler = () => {
  //   dispatch(logout());
  // };
  // useEffect(() => {}, [userInfo, adminInfo]);
  return (
    <div className="margin-t-b">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Map-O-Pedia</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* <Nav className="m-auto">
              {(userInfo || adminInfo) && (
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form>
              )}
            </Nav> */}
            <Nav className="m-auto">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </Nav>
            <Nav>
              {/* {userInfo ? (
                <>
                  <Nav.Link href="/mynotes">My Notes</Nav.Link>
                  <Nav.Link href="/map">Map</Nav.Link>
                  <Nav.Link href="/reviews">Reviews</Nav.Link>
                  <NavDropdown
                    title={`${userInfo.fullName}`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/profile">
                      <img
                        alt=""
                        src={`${userInfo.pic}`}
                        width="25"
                        height="25"
                        style={{ marginRight: 10 }}
                      />
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={userlogoutHandler || adminlogoutHandler}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : adminInfo ? (
                <>
                  <Nav.Link href="/mynotes">My Notes</Nav.Link>
                  <Nav.Link href="/pins">Pins</Nav.Link>
                  <Nav.Link href="/map">Map</Nav.Link>
                  <Nav.Link href="/reviews">Reviews</Nav.Link>
                  <NavDropdown
                    title={`${adminInfo.fullName}`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/admin/profile">
                      <img
                        alt=""
                        src={`${adminInfo.pic}`}
                        width="25"
                        height="25"
                        style={{ marginRight: 10 }}
                      />
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={adminlogoutHandler || userlogoutHandler}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : ( */}
              <>
                <Nav.Link href="/users/landing">Learn</Nav.Link>
                <Nav.Link href="/admin/landing">Educate</Nav.Link>
                <Nav.Link href="/map">Map</Nav.Link>
              </>
              {/* )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
