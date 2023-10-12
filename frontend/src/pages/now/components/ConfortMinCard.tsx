import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { confort } from "../../../Types";
import { MiniWeatherIcon } from "../../../utils/WeatherIcon";

interface ConfortMinCardProps {
  values: confort;
}

const ConfortMinCard = ({ values }: ConfortMinCardProps) => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <MiniWeatherIcon value={values.name} />
          </Col>
          <Col>{values.name}</Col>
          <Col>{values.value}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default ConfortMinCard;
