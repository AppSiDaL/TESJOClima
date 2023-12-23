import Card from "react-bootstrap/Card";
import { confortValues } from "../../../Types";
import AirQualityTexts from "./AirQualityTexts";

interface AirQualityProps {
  values: confortValues;
}

const AirQuality = ({ values }: AirQualityProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Indice de calidad del aire</Card.Title>
        <AirQualityTexts airQuality={values.airQuality} />
      </Card.Body>
    </Card>
  );
};

export default AirQuality;
