import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MainCard from "./components/MainCard";
import AirQuality from "./components/AirQuality";
import TodayPronostics from "./components/TodayPronostics";

import { nowProps } from "../../Types";
import ConfortCard from "./components/ConfortCard";
import { useQuery } from "react-query";
import weatherService from "../../services/weather";
import { WeatherIcon } from "../../utils/WeatherIcon";
import SunriseSunset from "./components/SunSetSunRise";
import Theme from "../../utils/Theme";
const NowPage = () => {
  const result = useQuery({
    queryKey: ["now"],
    queryFn: () => weatherService.getNow(),
  });
  const theme = Theme.getGradient();
  if (result.isLoading) {
    return (
      <div className={theme}>
        <WeatherIcon estadoTiempo="loading" width="70%" height="70%" />
      </div>
    );
  }

  const now: nowProps = result.data;
  const iconColor = Theme.getColor();
  return (
    <Container
      className={theme + " d-flex justify-content-center align-items-center"}
      fluid
    >
      <Row>
        <Col sm={9}>
          <MainCard values={now.confortValues} />
          <div style={{ height: 5 }} />
          <ConfortCard iconColor={iconColor} values={now.confortValues} />
          <div style={{ height: 5 }} />
          <TodayPronostics
            title="Pronostico Para Hoy"
            todayValues={now.todayPronostic}
          />
          <div style={{ height: 5 }} />
          <TodayPronostics
            to="/hours"
            title="Pronostico Por Hora"
            todayValues={now.hourPronostic}
          />
          <div style={{ height: 5 }} />
          <TodayPronostics
            title="Pronostico Por Dia"
            to="/hours"
            todayValues={now.dialyPronostics}
          />
        </Col>
        <Col sm={3}>
          <AirQuality values={now.confortValues} />
          <div style={{ height: 5 }} />
          <SunriseSunset values={now.confortValues} />
        </Col>
      </Row>
    </Container>
  );
};

export default NowPage;
