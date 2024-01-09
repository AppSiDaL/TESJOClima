import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./components/CustomToolTip";
import { AreaChart } from "recharts";
import { Area } from "recharts";

interface WeekChartProps {
  datosClimaticos: any[];
}

const TempetureChart: React.FC<WeekChartProps> = ({ datosClimaticos }) => {
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
        <XAxis dataKey="hora"/>
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Legend />
        <Area
          type="monotone"
          dataKey="temperatura"
          label="Temperatura"
          strokeWidth={3}
          activeDot={{ r: 5 }}
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TempetureChart;
