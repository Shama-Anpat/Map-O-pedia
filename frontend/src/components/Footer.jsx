import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Screen.css";
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Map-O-Pedia 2022
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
