import { Tab, Tabs } from "react-bootstrap";
import WeekChart from "../../../charts/WeekChart";
import DataCards from "./DataCards";
import { landingProps } from "../../../Types";
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
              <WeekChart datosClimaticos={landing.week} />
            </Tab>
            <Tab eventKey="todayLluvia" title="Lluvia">
              <DataCards data={landing.actual} />
            </Tab>
            <Tab eventKey="todayViento" title="Viento">
              <DataCards data={landing.actual} />
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey="week" title="Semana">
          <DataCards data={landing.actual} />
        </Tab>
      </Tabs>
    </div>
  );
}
