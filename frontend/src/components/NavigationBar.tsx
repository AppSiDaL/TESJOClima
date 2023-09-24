import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import TESJOLogo from "../assets/LogoTESJO.jpg";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
const NavigationBar = () => {
  return (
    <div style={{ background: "#022D50", color: "white" }}>
      <Navbar expand="lg">
        <Container style={{ background: "#022D50" }} fluid>
          <Navbar.Brand href="#">
            <Image
              src={TESJOLogo}
              alt="TESJO Logo"
              className="img-fluid"
              style={{ maxWidth: "150px", maxHeight: "70px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 text-light"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/" className="text-light">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/now" className="text-light">
                Now
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="date"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid style={{ background: "#355773" }}>
        <div className="text-center">
          Tecnologico de Estudios Superiores, Jocotitlan, Edo. Mexico. a Fri Sep
          22 2023
        </div>
      </Container>
    </div>
  );
};

export default NavigationBar;