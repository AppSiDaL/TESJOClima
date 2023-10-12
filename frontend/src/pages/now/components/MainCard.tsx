import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Theme from "../../../utils/Theme";
import { WeatherIcon } from "../../../utils/WeatherIcon";
import { confortValues } from "../../../Types";

interface MainCardProps {
  values: confortValues;
}

const MainCard = ({ values }: MainCardProps) => {
  const backgroundImage = Theme.getBackground();
  return (
    <Card
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
      className="text-center"
    >
      <Card.Header style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
        <strong>Jocotitlan</strong> A partir de las {values.hora} CST
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <Card.Title>
                <h1>{values.tempeture}</h1>
              </Card.Title>
              <div>
                <h3>Soleado</h3>
                <h2>Dia 27º . Noche 12º</h2>
              </div>
            </Col>
            <Col>
              <WeatherIcon
                height="100px"
                width="100px"
                estadoTiempo="cloudy-heavyRain"
              />
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default MainCard;
