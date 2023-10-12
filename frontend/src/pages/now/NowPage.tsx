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
const NowPage = () => {
  const result = useQuery({
    queryKey: ["now"],
    queryFn: () => weatherService.getNow(),
  });

  if (result.isLoading) {
    return (
      <div className="gen">
        <WeatherIcon estadoTiempo="loading" width="50%" height="50%" />
      </div>
    );
  }

  const now: nowProps = result.data;

  return (
    <Container
      className="gen d-flex justify-content-center align-items-center"
      fluid
    >
      <Row>
        <Col sm={9}>
          <MainCard values={now.confortValues} />
          <TodayPronostics todayValues={now.todayPronostic} />
          <ConfortCard values={now.confortValues} />
          <TodayPronostics todayValues={now.hourPronostic} />
          <TodayPronostics todayValues={now.dialyPronostics} />
        </Col>
        <Col sm={3}>
          <AirQuality values={now.confortValues} />
        </Col>
      </Row>
    </Container>
  );
};

export default NowPage;
