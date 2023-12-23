import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { hoursValues } from "../../../Types";
import { WeatherIcon } from "../../../utils/WeatherIcon";
import Theme from "../../../utils/Theme";

import {
  Thermometer,
  ChevronBarDown,
  Wind,
  Droplet,
  Umbrella,
  Lightbulb,
} from "react-bootstrap-icons";

interface HourCardProps {
  values: hoursValues;
}
const iconColor = Theme.getColor();

const HourCard = ({ values }: HourCardProps) => {
  const [mostrarComponente, setMostrarComponente] = useState(false);

  const toggleComponente = () => {
    setMostrarComponente(!mostrarComponente);
  };
  return (
    <Container
      className="containerHours"
      style={{
        border: 0,
        borderTop: 1,
        borderColor: "gray",
        borderStyle: "solid",
      }}
    >
      <Row onClick={toggleComponente}>
        <Col>
          <Row>
            <Col>
              <p>{values.hora}</p>
            </Col>
            <Col>
              <p>{values.temperatura} º</p>
            </Col>
            <Col className="d-flex align-items-center">
              <WeatherIcon
                estadoTiempo={values.estado_tiempo}
                width="50px"
                height="50px"
              />
              <p>{values.estado_tiempo}</p>
            </Col>
            <Col>
              <p>
                <Umbrella color={iconColor} />
                {values.probabilidad_de_lluvia} %
              </p>
            </Col>
            <Col>
              <p>
                <Wind color={iconColor} />
                {values.velocidad_viento}
              </p>
            </Col>
            <Col>
              <ChevronBarDown size={40} color="#0D19E0" />
            </Col>
          </Row>
        </Col>
      </Row>
      {mostrarComponente && <MiComponenteTogglable values={values} />}
    </Container>
  );
};
const MiComponenteTogglable = ({ values }: HourCardProps) => {
  return (
    <Container>
      <Row
        style={{
          border: 1,
          borderColor: "gray",
          borderStyle: "solid",
        }}
      >
        <Col
          md={4}
          className="text-center d-flex align-items-center justify-content-center"
        >
          <Thermometer color={iconColor} />
          <div className="ml-2">
            Sensacion Termica
            <p>{values.temperatura}</p>
          </div>
        </Col>
        <Col
          md={4}
          className="text-center d-flex align-items-center justify-content-center"
        >
          <Wind color={iconColor} />
          <div className="ml-2">
            Viento
            <p>{values.velocidad_viento}</p>
          </div>
        </Col>
        <Col
          md={4}
          className="text-center d-flex align-items-center justify-content-center"
        >
          <Droplet color={iconColor} />
          <div className="ml-2">
            Humedad
            <p>{values.humedad}</p>
          </div>
        </Col>
      </Row>
      <Row
        style={{
          border: 1,
          borderColor: "gray",
          borderStyle: "solid",
        }}
      >
        <Col
          md={4}
          className="text-center d-flex align-items-center justify-content-center"
        >
          <Umbrella color={iconColor} />
          <div className="ml-2">
            Lluvia
            <p>{values.lluvia}</p>
          </div>
        </Col>
        <Col
          md={4}
          className="text-center d-flex align-items-center justify-content-center"
        >
          <Wind color={iconColor} />
          <div className="ml-2">
            Direccion Viento
            <p>{values.direccion_viento}</p>
          </div>
        </Col>
        <Col
          md={4}
          className="text-center d-flex align-items-center justify-content-center"
        >
          <Lightbulb color={iconColor} />
          <div className="ml-2">
            Luz
            <p>{values.luz}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HourCard;
