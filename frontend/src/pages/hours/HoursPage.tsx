import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import weatherService from "../../services/weather";
import { useQuery } from "react-query";
import { hoursValues } from "../../Types";
import HourCard from "./components/HourCard";
import { WeatherIcon } from "../../utils/WeatherIcon";
import Theme from "../../utils/Theme";

const HoursPage = () => {
  const result = useQuery({
    queryKey: ["hours"],
    queryFn: () => weatherService.getHours(),
  });
  const theme = Theme.getGradient();

  if (result.isLoading) {
    return (
      <div className={theme}>
        <WeatherIcon estadoTiempo="loading" width="50%" height="50%" />
      </div>
    );
  }

  const hours: hoursValues[] = result.data;
  const date = new Date();
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  return (
    <Container
      className={theme + " justify-content-center align-items-center"}
      fluid
    >
      <Card className="text-center  container-sm">
        <Card.Header>
          Pronostico por hora <strong>Jocotitlan</strong>
        </Card.Header>
        <Card.Body>
          <div>
            <h2>{days[date.getDay()] + " " + date.toLocaleDateString()}</h2>
          </div>
          {hours.map((hour, index) => {
            const [year, month, day] = hour.date.split("-").map(Number);
            const dateDate = new Date(year, month - 1, day);
            if (hour.hora === 0) {
              return (
                <div key={index}>
                  <h2>
                    {days[dateDate.getDay()] +
                      " " +
                      dateDate.toLocaleDateString()}
                  </h2>
                  <HourCard values={hour} />
                </div>
              );
            } else {
              return <HourCard key={index} values={hour} />;
            }
          })}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HoursPage;
