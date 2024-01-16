import { Tab, Tabs } from "react-bootstrap";
import { landingProps } from "../../../Types";
import TempetureChart from "../../../charts/TempetureChart";
import RainChart from "../../../charts/RainChart";
import WindChart from "../../../charts/WindChart";
interface tabsComponentProps {
  landing: landingProps;
}

export default function TabsComponent({ landing }: tabsComponentProps) {
  return (
    <div className="container text-center">
      <Tabs
        defaultActiveKey="today"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="today" title="Hoy">
          <Tabs
            defaultActiveKey="todayTempeture"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="todayTempeture" title="Temperatura">
              <TempetureChart datosClimaticos={landing.next48} range="today" />
            </Tab>
            <Tab eventKey="todayLluvia" title="Lluvia">
              <RainChart datosClimaticos={landing.next48} range="today" />
            </Tab>
            <Tab eventKey="todayViento" title="Viento">
              <WindChart datosClimaticos={landing.next48} range="today" />
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey="week" title="Semana">
          <Tabs
            defaultActiveKey="weekTempeture"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="weekTempeture" title="Temperatura">
              <TempetureChart datosClimaticos={landing.week} range="week" />
            </Tab>
            <Tab eventKey="weekRain" title="Lluvia">
              <RainChart datosClimaticos={landing.week} range="week" />
            </Tab>
            <Tab eventKey="weekWind" title="Viento">
              <WindChart datosClimaticos={landing.week} range="week" />
            </Tab>
          </Tabs>
        </Tab>
      </Tabs>
    </div>
  );
}
