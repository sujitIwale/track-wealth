import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="desktop"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={false}
        />
        {/* <Line
          type="monotone"
          dataKey="mobile"
          stroke="var(--chart-2)"
          strokeWidth={2}
          dot={false}
        /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
