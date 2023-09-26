import Card from "react-bootstrap/Card";
import { DatosClimaticos } from "../../../Types";
import { WeatherIcon } from "../../../WeatherIcon";
interface DataCardsProps {
  data: DatosClimaticos;
}

const DataCards = ({ data }: DataCardsProps) => {
  return (
    <div className="container text-center">
      <div className="row">
        {data.confort.map((dato) => (
          <div className="col" key={dato.name}>
            <Card
              style={{
                width: "20rem",
                backgroundColor: "transparent",
                color: "white",
              }}
              className="text-center border-0"
            >
              <Card.Body>
                <Card.Title>{dato.name}</Card.Title>
                <WeatherIcon estadoTiempo={dato.name} />
                <Card.Text>{dato.value}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCards;
