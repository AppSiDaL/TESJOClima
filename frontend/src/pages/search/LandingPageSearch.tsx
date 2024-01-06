import Header from "./components/Header";
import TodayScroll from "./components/TodayScroll";
import { landingProps } from "../../Types";
import WeekScroll from "./components/WeekScroll";
import WeekChart from "../../charts/TempetureChart";
import DataCards from "./components/DataCards";
import Theme from "../../utils/Theme";
import { useQuery } from "react-query";
import weatherService from "../../services/weather";
import { WeatherIcon } from "../../utils/WeatherIcon";
export default function LangingPageSearch() {
  const backgroundImage = Theme.getBackground();
  const result = useQuery({
    queryKey: ["landing"],
    queryFn: () => weatherService.getLanding(),
  });

  if (result.isLoading) {
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <WeatherIcon estadoTiempo="loading" width="70%" height="70%" />
      </div>
    );
  }

  const landing: landingProps = result.data;
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      <Header data={landing.actual} />
      <TodayScroll datosClimaticos={landing.next48} />
      <WeekScroll datosClimaticos={landing.week} />
      <div className="container text-center">
        <WeekChart datosClimaticos={landing.week} />
        <DataCards data={landing.actual} />
      </div>
    </div>
  );
}
