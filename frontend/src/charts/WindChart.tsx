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
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const WindDirectionArrow = (props: any) => {
  const { cx, cy, payload } = props;
  const rotation = payload.windDirection; // Asegúrate de que esto es un número en grados

  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 40 40">
      <polygon
        points="20,0 30,40 20,30 10,40"
        transform={`rotate(${rotation}, 20, 20)`}
        fill="black"
      />
    </svg>
  );
};

export default function WindChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          strokeDasharray="5 5"
          dot={<WindDirectionArrow />}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          strokeDasharray="3 4 5 2"
          dot={<WindDirectionArrow />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
