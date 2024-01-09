import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface WeekChartProps {
  datosClimaticos: any[];
}

export default function RainChart({ datosClimaticos }: WeekChartProps) {
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
        <XAxis dataKey="name" />
        <YAxis  />
        <Tooltip />
        <Legend />
        <Bar dataKey="porcentaje_lluvia" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
