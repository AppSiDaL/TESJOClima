import Card from "react-bootstrap/Card";
import { SunriseSunsetIcon } from "../../../utils/WeatherIcon";

import { ArrowBarDown, ArrowBarUp } from "react-bootstrap-icons";
import { confortValues } from "../../../Types";

interface SunriseSunsetProps {
  values: confortValues;
}
const SunriseSunset = ({ values }: SunriseSunsetProps) => {
  const sunrise = new Date(values.sunrise);
  const sunset = new Date(values.sunset);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Amanecer y Atardecer</Card.Title>
        <SunriseSunsetIcon />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <ArrowBarUp color="#FF6D46" />
            <p style={{ color: "#FF6D46" }}>{sunrise.toLocaleTimeString()}</p>
          </div>
          <div>
            <ArrowBarDown color="#FF6D46" />
            <p style={{ color: "#FF6D46" }}>{sunset.toLocaleTimeString()}</p>
          </div>
        </div>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SunriseSunset;
