import { Card } from "react-bootstrap";

export default function AirQualityTexts({
  airQuality,
}: {
  airQuality: number;
}) {
  if (airQuality >= 0 && airQuality <= 50) {
    return (
      <>
        <h1 style={{ color:"green" }}>{airQuality}</h1>
        <Card.Text>
          La calidad del aire es satisfactoria y la contaminación del aire
          presenta poco o ningún riesgo.
        </Card.Text>
      </>
    );
  }
  if (airQuality >= 51 && airQuality <= 100) {
    return (
      <>
        <h1 style={{ color:"yellow" }}>{airQuality}</h1>
        <Card.Text>
          La calidad del aire es aceptable, aunque para algunos contaminantes
          puede haber un problema de salud moderado para un número muy pequeño
          de personas que son inusualmente sensibles a la contaminación del
          aire.
        </Card.Text>
      </>
    );
  }
  if (airQuality >= 101 && airQuality <= 150) {
    return (
      <>
        <h1 style={{ color:"orange" }}>{airQuality}</h1>
        <Card.Text>
          Los miembros de grupos sensibles pueden experimentar efectos en la
          salud. Es poco probable que el público en general sea afectado.
        </Card.Text>
      </>
    );
  }
  if (airQuality >= 151 && airQuality <= 200) {
    return (
      <>
        <h1 style={{ color:"red" }}>{airQuality}</h1>

        <Card.Text>
          Todo el mundo puede comenzar a experimentar efectos en la salud; los
          miembros de grupos sensibles pueden experimentar efectos de salud más
          graves.
        </Card.Text>
      </>
    );
  }
  if (airQuality >= 201 && airQuality <= 300) {
    return (
      <>
        <h1 style={{ color:"purple" }}>{airQuality}</h1>
        <Card.Text>
          Las advertencias de salud de condiciones de emergencia. Toda la
          población corre el riesgo de efectos en la salud más graves.
        </Card.Text>
      </>
    );
  }
  if (airQuality >= 301) {
    return (
      <>
        <h1 style={{ color:"brown" }}>{airQuality}</h1>
        <Card.Text>
          La advertencia de salud de emergencia de todos los miembros de la
          población se puede ver afectada de manera más significativa.
        </Card.Text>
      </>
    );
  }
}
