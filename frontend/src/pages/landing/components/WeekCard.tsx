import Card from "react-bootstrap/Card";
import { DatosClimaticosSemanales } from "../../../Types";
import { WeatherIcon } from "../../../utils/WeatherIcon";

interface WeekCardProps {
  dato: DatosClimaticosSemanales;
}
const WeekCard = ({ dato }: WeekCardProps) => {
  return (
    <li className="list-inline-item">
      <Card
        style={{
          width: "18rem",
          backgroundColor: "transparent",
          color: "white",
        }}
        className="text-center border-0"
      >
        <Card.Body>
          <Card.Title>{dato.dia}</Card.Title>
          <Card.Text>{dato.fecha}</Card.Text>
          <WeatherIcon height="200px" width="200px" estadoTiempo={dato.pronostico} />
          <Card.Text>
            {dato.temperatura_maxima}º/{dato.temperatura_minima}º
          </Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
};

export default WeekCard;
