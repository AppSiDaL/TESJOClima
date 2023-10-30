import Card from "react-bootstrap/Card";
import { SunriseSunsetIcon } from "../../../utils/WeatherIcon";
import { confortValues } from "../../../Types";

import { ArrowBarDown, ArrowBarUp } from "react-bootstrap-icons";

interface AirQualityProps {
  values: confortValues;
}

const SunriseSunset = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Amanecer y Atardecer</Card.Title>
        <SunriseSunsetIcon />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <ArrowBarUp color="#FF6D46" />
            <p>6:00</p>
          </div>
          <div>
            <ArrowBarDown color="#FF6D46" />
            <p>18:00</p>
          </div>
        </div>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SunriseSunset;
