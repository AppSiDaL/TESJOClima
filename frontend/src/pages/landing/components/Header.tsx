import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DatosClimaticos } from "../../../Types";
interface HeaderProps {
  data: DatosClimaticos;
}
const Header = ({data}:HeaderProps) => {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1 className="mb-5">TESJO</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h2 className="mb-5">23/9/2023, 7:15:53</h2>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h1 className="display-1 mb-5">{data.temperatura}º</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h1 className="h5">Amanecer</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
