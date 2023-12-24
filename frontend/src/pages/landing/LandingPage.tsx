import Header from "./components/Header";
import TodayScroll from "./components/TodayScroll";
import { landingProps } from "../../Types";
import WeekScroll from "./components/WeekScroll";
import WeekChart from "../../charts/WeekChart";
import DataCards from "./components/DataCards";
import Theme from "../../utils/Theme";
import { useQuery } from "react-query";
import weatherService from "../../services/weather";
import { WeatherIcon } from "../../utils/WeatherIcon";
import { Tab, Tabs } from "react-bootstrap";

const LangingPage = () => {
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
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="first" title="Today">
            <WeekChart datosClimaticos={landing.week} />
          </Tab>
          <Tab eventKey="second" title="Week">
            <DataCards data={landing.actual} />
          </Tab>
        </Tabs>
        <WeekChart datosClimaticos={landing.week} />
        <DataCards data={landing.actual} />
      </div>
    </div>
  );
};

export default LangingPage;
