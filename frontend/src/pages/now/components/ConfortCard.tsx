import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ConfortMinCard from "./ConfortMinCard";
import { confortValues } from "../../../Types";
import { SunriseSunsetIcon } from "../../../utils/WeatherIcon";

interface ConfortCardProps {
  values: confortValues;
}

const ConfortCard = ({ values }: ConfortCardProps) => {
  return (
    <Card>
      <Card.Header>El tiempo en Jocotitlan hoy</Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <Card.Title>
                <h6>Sensacion termica</h6>
                <h1>{values.tempeture}</h1>
              </Card.Title>
            </Col>
            <Col>
              <SunriseSunsetIcon />
            </Col>
          </Row>
        </Container>
        <Container className="text-center">
          {values.confort.map((confort) => (
            <Row key={confort.name}>
              <Col>
                <ConfortMinCard values={confort} />
              </Col>
            </Row>
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
};


export default ConfortCard;
