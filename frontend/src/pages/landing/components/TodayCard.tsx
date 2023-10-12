import Card from "react-bootstrap/Card";
import { DatosClimaticos } from "../../../Types";
import { WeatherIcon } from "../../../utils/WeatherIcon"; // Asegúrate de importar el componente WeatherIcon desde su ubicación correcta

interface TodayCardProps {
  dato: DatosClimaticos;
}

const TodayCard = ({ dato }: TodayCardProps) => {
  return (
    <li className="list-inline-item">
      <Card
        style={{ width: "18rem", backgroundColor: "transparent",color:"white" }}
        className="text-center border-0"
      >
        <Card.Body>
          <Card.Title>{dato.temperatura}º</Card.Title>
          <WeatherIcon width="200px" height="200px" estadoTiempo={dato.estado_tiempo} />
          <Card.Text>{dato.porcentaje_lluvia}%</Card.Text>
          <Card.Text>{dato.hora}</Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
};

export default TodayCard;
