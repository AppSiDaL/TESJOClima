import { DatosClimaticos } from "../../../Types";
import TodayCard from "./TodayCard";
import "../landing.css"

interface TodayScrollProps {
  datosClimaticos: DatosClimaticos[];
}

const TodayScroll = ({ datosClimaticos }: TodayScrollProps) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="overflow-auto">
            <ul className="list-inline cardList">
              {datosClimaticos.map((dato, index) => (
                <TodayCard key={index} dato={dato} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayScroll;
