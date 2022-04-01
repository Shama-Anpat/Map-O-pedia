import React from "react";
import { Button, Container, Jumbotron, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import img1 from "../../images/img1.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jfif";
import img4 from "../../images/img4.jpg";
import "./LandingStyless.css";

function LandingPage() {
  return (
    <div className="main">
      <Container>
        <Carousel fade>
          <Carousel.Item>
            <img className="d-block w-100" src={img1} alt="First slide" />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img2} alt="Second slide" />

            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img1} alt="Third slide" />

            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img3} alt="Third slide" />

            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img4} alt="Third slide" />

            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
        <Jumbotron className="mainjumbotron">
          <p>
            A map-o-pedia is a platform that allows users to capture and share
            information about historical places by placing pins on the map at
            the location and providing any valuable information about that
            place. The platform can be utilized by two types of users.
          </p>
          <h3>DO YOU WANT TO CREATE PIN ?</h3>
          <div className="buttonContainer">
            <Link to="/admin/landing">
              <Button
                variant="outline-dark"
                size="lg"
                className="landingbutton"
              >
                <b>Yes</b>
              </Button>
            </Link>
            <Link to="/users/landing">
              <Button
                variant="outline-dark"
                size="lg"
                className="landingbutton"
              >
                <b>No</b>
              </Button>
            </Link>
          </div>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default LandingPage;
