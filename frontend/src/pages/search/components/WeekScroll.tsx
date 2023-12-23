import { DatosClimaticosSemanales } from "../../../Types";
import "../landing.css";
import WeekCard from "./WeekCard";

interface WeekScrollProps {
  datosClimaticos: DatosClimaticosSemanales[];
}

const WeekScroll = ({ datosClimaticos }: WeekScrollProps) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="overflow-auto" style={{ whiteSpace: "nowrap" }}>
            <ul className="list-inline cardList">
              {datosClimaticos.map((dato, index) => (
                <WeekCard key={index} dato={dato} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekScroll;
