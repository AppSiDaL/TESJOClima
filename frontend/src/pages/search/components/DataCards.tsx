import Card from "react-bootstrap/Card";
import { DatosClimaticos } from "../../../Types";
import { GetChart } from "../../../utils/WeatherIcon";
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
                borderColor: "black",
                color: "white",
              }}
              className="text-center"
            >
              <Card.Body>
                <Card.Title style={{ textTransform: "capitalize" }}>
                  {dato.name}
                </Card.Title>
                <GetChart name={dato.name} value={dato.value} />
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
