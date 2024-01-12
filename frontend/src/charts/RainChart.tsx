import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./components/CustomToolTip";

interface WeekChartProps {
  datosClimaticos: any[];
  range: string;
}

export default function RainChart({ datosClimaticos,range }: WeekChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
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
        <XAxis dataKey={range==="today"?"hora":"dia"} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Legend />
        <Bar dataKey="porcentaje_lluvia" fill="blue" />
      </BarChart>
    </ResponsiveContainer>
  );
}
