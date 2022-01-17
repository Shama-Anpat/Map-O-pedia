import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#adb5bd",
        color: "black",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &nbsp; &copy; &nbsp; Map-O-Pedia &nbsp; 2022
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
