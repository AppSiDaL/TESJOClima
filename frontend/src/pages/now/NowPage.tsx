import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MainCard from "./components/MainCard";
import AirQuality from "./components/AirQuality";
import TodayPronostics from "./components/TodayPronostics";
const NowPage = () => {
  return (
    <Container>
      <Row>
        <Col sm={8}>
          <MainCard />
          <TodayPronostics/>
        </Col>
        <Col sm={4}>
          <AirQuality />
        </Col>
      </Row>
      <Row>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
      </Row>
    </Container>
  );
};

export default NowPage;
