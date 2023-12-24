import Card from "react-bootstrap/Card";
import { WeatherIcon } from "../../../utils/WeatherIcon"; // Asegúrate de importar el componente WeatherIcon desde su ubicación correcta

import { dayPronostics } from "../../../Types";
import { CloudDrizzle } from "react-bootstrap-icons";

interface pronosticCardProps {
  value: dayPronostics;
}

const PronosticCard = ({ value }: pronosticCardProps) => {
  return (
    <li className="list-inline-item">
      <Card
        style={{
          width: "9rem",
          backgroundColor: "transparent",
        }}
        className="text-center border-0"
      >
        <Card.Body>
          <Card.Title>
            <h5 style={{textTransform:"capitalize"}}>{value.momento}</h5>
          </Card.Title>
          <Card.Title>
            <h5>{value.temperatura} º</h5>
          </Card.Title>
          <WeatherIcon
            height="100px"
            width="100px"
            estadoTiempo={value.tiempo}
          />
          <Card.Text> <CloudDrizzle size={15}/> {value.probabilidad_de_lluvia} %</Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
};

export default PronosticCard;
