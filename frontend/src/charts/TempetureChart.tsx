import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { CustomTooltip } from "./components/CustomToolTip";
import { AreaChart } from "recharts";
import { Area } from "recharts";

interface WeekChartProps {
  datosClimaticos: any[];
  range: string;
}

const TempetureChart: React.FC<WeekChartProps> = ({
  datosClimaticos,
  range,
}) => {
  if (range === "today") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={500}
          height={300}
          data={datosClimaticos}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey={"hora"} />
          <YAxis />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="temperatura"
            label="Temperatura"
            strokeWidth={3}
            activeDot={{ r: 5 }}
            stroke="#F09B59"
            fill="#F09B59"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  } else {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={datosClimaticos}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey={"dia"} />
          <YAxis />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={"temperatura_minima"}
            label="Temperatura"
            strokeWidth={3}
            stroke="#10336B"
            fill="#10336B"
          />
          <Line
            type="monotone"
            dataKey={"temperatura_maxima"}
            label="Temperatura"
            strokeWidth={3}
            stroke="#6B0000"
            fill="#6B0000"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
};

export default TempetureChart;
