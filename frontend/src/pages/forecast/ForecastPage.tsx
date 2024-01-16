import Header from "./components/Header";
import TodayScroll from "./components/TodayScroll";
import { landingProps } from "../../Types";
import WeekScroll from "./components/WeekScroll";
import Theme from "../../utils/Theme";
import { useQuery, useQueryClient } from "react-query";
import weatherService from "../../services/weather";
import { WeatherIcon } from "../../utils/WeatherIcon";
import TabsComponent from "./components/TabsComponent";
import DataCards from "./components/DataCards";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ForecastPage = () => {
  const backgroundImage = Theme.getBackground();
  const params = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => queryClient.removeQueries('forecast');
  }, [params.ts, queryClient]);

  const result = useQuery({
    queryKey: ["forecast"],
    queryFn: () => weatherService.getForecast(params.ts),
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
          paddingTop: 69,
          scrollBehavior: "smooth",
        }}
      >
        <WeatherIcon estadoTiempo="loading" width="50%" height="50%" />
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
      <TabsComponent landing={landing} />
      <DataCards data={landing.actual} />
    </div>
  );
};

export default ForecastPage;
