import { Tab, Tabs } from "react-bootstrap";
import DataCards from "./DataCards";
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
              <TempetureChart datosClimaticos={landing.next48} />
            </Tab>
            <Tab eventKey="todayLluvia" title="Lluvia">
              <RainChart />
            </Tab>
            <Tab eventKey="todayViento" title="Viento">
              <WindChart />
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
