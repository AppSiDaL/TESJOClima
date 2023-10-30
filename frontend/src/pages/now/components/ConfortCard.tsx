import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ConfortMinCard from "./ConfortMinCard";
import { confortValues } from "../../../Types";

interface ConfortCardProps {
  values: confortValues;
  iconColor: string;
}

const ConfortCard = ({ values, iconColor }: ConfortCardProps) => {
  return (
    <Card>
      <Card.Header>El tiempo en Jocotitlan hoy</Card.Header>
      <Card.Body>
        <Container className="text-center">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {values.confort.map((confort) => (
              <ConfortMinCard
                values={confort}
                key={confort.name}
                iconColor={iconColor}
              />
            ))}
          </div>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default ConfortCard;
