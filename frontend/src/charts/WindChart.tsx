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

interface TodayWindChartProps {
  datosClimaticos: any[];
  range: string;
}
const WindDirectionArrow = (props: any) => {
  const { cx, cy, payload } = props;
  const rotation = payload.direccion_viento; 

  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 40 40">
      <polygon
        points="20,0 30,40 20,30 10,40"
        transform={`rotate(${rotation}, 20, 20)`}
        fill="white"
      />
    </svg>
  );
};

export default function WindChart({ datosClimaticos,range }: TodayWindChartProps) {
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
        <XAxis dataKey={range==="today"?"hora":"dia"} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Legend />
        <Line
          type="monotone"
          dataKey="velocidad_viento"
          stroke="#8884d8"
          strokeDasharray="5 5"
          dot={<WindDirectionArrow direccion={datosClimaticos}/>}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
