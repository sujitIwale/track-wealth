import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Expense } from "@/types/expense";

interface ChartProps {
  expenses: Expense[];
}

const Chart = ({ expenses }: ChartProps) => {
  const chartData = expenses.map((expense) => ({
    date: new Date(expense.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    amount: expense.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      {expenses.length > 7 ? (
        <LineChart data={chartData}>
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      ) : (
        <BarChart data={chartData}>
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Bar dataKey="amount" fill="var(--chart-1)" />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};

export default Chart;
