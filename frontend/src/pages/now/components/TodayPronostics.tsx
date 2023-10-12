import Card from "react-bootstrap/Card";
import PronosticCard from "./PronosticCard";

import { dayPronostics } from "../../../Types";

interface todayPronosticsProps {
  todayValues: dayPronostics[];
}

const TodayPronostics = ({ todayValues }: todayPronosticsProps) => {
  return (
    <Card>
      <Card.Header as="h5">Pronosticos para hoy en Jocotitlan</Card.Header>
      <Card.Body>
        {todayValues.map((value) => (
          <PronosticCard key={value.momento} value={value} />
        ))}
      </Card.Body>
    </Card>
  );
};

export default TodayPronostics;
