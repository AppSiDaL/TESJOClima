import Card from "react-bootstrap/Card";
import { WeatherIcon } from "../../../WeatherIcon"; // Asegúrate de importar el componente WeatherIcon desde su ubicación correcta

const PronosticCard = () => {
  return (
    <li className="list-inline-item">
      <Card
        style={{
          width: "18rem",
          backgroundColor: "transparent",
        }}
        className="text-center border-0"
      >
        <Card.Body>
          <Card.Title>dato.temperatura º</Card.Title>
          <WeatherIcon estadoTiempo={"day-clear"} />
          <Card.Text>dato.porcentaje_lluvia %</Card.Text>
          <Card.Text>dato.hora</Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
};

export default PronosticCard;
