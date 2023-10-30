import Card from "react-bootstrap/Card";
import PronosticCard from "./PronosticCard";

import { dayPronostics } from "../../../Types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Theme from "../../../utils/Theme";
interface todayPronosticsProps {
  todayValues: dayPronostics[];
  title: string;
  to?: string;
}

const TodayPronostics = ({ todayValues, title, to }: todayPronosticsProps) => {
  const buttonColor = Theme.getGradient();
  return (
    <Card>
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        <div>{title}</div>
        {to ? (
          <Button className={buttonColor + "-button"}>
            <Link to={to}>View More</Link>
          </Button>
        ) : (
          ""
        )}
      </Card.Header>

      <Card.Body className="text-center">
        {todayValues.map((value) => (
          <PronosticCard key={value.momento} value={value} />
        ))}
      </Card.Body>
    </Card>
  );
};

export default TodayPronostics;
