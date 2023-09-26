import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Theme from "../../../utils/Theme";
const MainCard = () => {
  const backgroundImage = Theme.getBackground();
  return (
    <Card
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card.Header style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
        <strong>Jocotitlan</strong> A partir de las 13:30 CST
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <Card.Title><h1>24 º</h1></Card.Title>
              <div>
                <h3>Soleado</h3>
                <h2>Dia 27º . Noche 12º</h2>
              </div>
            </Col>
            <Col>Icon</Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default MainCard;
