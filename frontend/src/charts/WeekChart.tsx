import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./components/CustomToolTip";
import { DatosClimaticosSemanales } from "../Types";

interface WeekChartProps {
  datosClimaticos: DatosClimaticosSemanales[];
}

const WeekChart: React.FC<WeekChartProps> = ({ datosClimaticos }) => {
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperatura_maxima"
          stroke="#940A2A"
          strokeWidth={3}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="temperatura_minima"
          stroke="#0C3A94"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeekChart;
