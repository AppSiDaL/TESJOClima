import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PronosticCard from "./PronosticCard";
const TodayPronostics = () => {
  return (
    <Card>
      <Card.Header as="h5">Pronosticos para hoy en Jocotitlan</Card.Header>
      <Card.Body>
        <PronosticCard />
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default TodayPronostics;
