import Card from "react-bootstrap/Card";
import { AirQualityIcon } from "../../../utils/WeatherIcon";
import { confortValues } from "../../../Types";

interface AirQualityProps {
  values: confortValues;
}

const AirQuality = ({ values }: AirQualityProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Indice de calidad del aire</Card.Title>
        <AirQualityIcon value={values.airQuality} />
        <Card.Text>
          La calidad del aire es aceptable, aunque puede existir un riesgo de
          salud moderado con algunos contaminantes para una cantidad muy
          reducida de personas inusualmente sensibles a la contaminación del
          aire.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AirQuality;
