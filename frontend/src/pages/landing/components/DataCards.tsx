import Card from "react-bootstrap/Card";
import { Player } from "@lottiefiles/react-lottie-player";
import { DatosClimaticos } from "../../../Types";
import humidity from "../../../assets/icons/confort/humidity.json";
import rain from "../../../assets/icons/confort/rain.json";
import light from "../../../assets/icons/confort/light.json";
import pressure from "../../../assets/icons/confort/pressure.json";
import wind from "../../../assets/icons/confort/wind.json";
import direction from "../../../assets/icons/confort/direccion.json";

interface DataCardsProps {
  data: DatosClimaticos;
}

const DataCards = ({ data }: DataCardsProps) => {
  const { confort } = data;

  return (
    <div className="container text-center">
      <div className="row mb-5">
        <div className="col">
          <Card
            style={{
              width: "18rem",
              backgroundColor: "transparent",
              color: "white",
            }}
            className="text-center border-0"
          >
            <Card.Body>
              <Card.Title>Humedad</Card.Title>
              <Player
                src={humidity}
                className="player"
                loop={true}
                autoplay={true}
                style={{ height: "150px", width: "150px" }}
              />
              <Card.Text>{confort.humedad} %</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card
            style={{
              width: "18rem",
              backgroundColor: "transparent",
              color: "white",
            }}
            className="text-center border-0"
          >
            <Card.Body>
              <Card.Title>Lluvia</Card.Title>
              <Player
                src={rain}
                className="player"
                loop={true}
                autoplay={true}
                style={{ height: "150px", width: "150px" }}
              />
              <Card.Text>{confort.lluvia}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card
            style={{
              width: "18rem",
              backgroundColor: "transparent",
              color: "white",
            }}
            className="text-center border-0"
          >
            <Card.Body>
              <Card.Title>Luz</Card.Title>
              <Player
                src={light}
                className="player"
                loop={true}
                autoplay={true}
                style={{ height: "150px", width: "150px" }}
              />
              <Card.Text>{confort.luz}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Card
            style={{
              width: "18rem",
              backgroundColor: "transparent",
              color: "white",
            }}
            className="text-center border-0"
          >
            <Card.Body>
              <Card.Title>Presión</Card.Title>
              <Player
                src={pressure}
                className="player"
                loop={true}
                autoplay={true}
                style={{ height: "150px", width: "150px" }}
              />
              <Card.Text>{confort.presion}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card
            style={{
              width: "18rem",
              backgroundColor: "transparent",
              color: "white",
            }}
            className="text-center border-0"
          >
            <Card.Body>
              <Card.Title>Viento</Card.Title>
              <Player
                src={wind}
                className="player"
                loop={true}
                autoplay={true}
                style={{ height: "150px", width: "150px" }}
              />
              <Card.Text>{confort.viento}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card
            style={{
              width: "18rem",
              backgroundColor: "transparent",
              color: "white",
            }}
            className="text-center border-0 text-center"
          >
            <Card.Body>
              <Card.Title>Dirección del Viento</Card.Title>
              <Player
                src={direction}
                className="player"
                loop={true}
                autoplay={true}
                style={{ height: "150px", width: "150px" }}
              />
              <Card.Text>{confort.direccion}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataCards;
