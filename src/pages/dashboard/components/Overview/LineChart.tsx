import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface LineChartProps {
  incomes: { amount: number; createdAt: string }[];
  expenses: { amount: number; createdAt: string }[];
}

const LineChart = ({ incomes, expenses }: LineChartProps) => {
  // Create a map of all unique dates
  const dateMap = new Map<
    string,
    { date: string; income?: number; expense?: number }
  >();

  // Add income entries to the map
  incomes.forEach((income) => {
    const date = new Date(income.createdAt).toLocaleDateString();
    dateMap.set(date, {
      date,
      income: income.amount,
      expense: 0,
    });
  });

  // Add or update expense entries in the map
  expenses.forEach((expense) => {
    const date = new Date(expense.createdAt).toLocaleDateString();
    const existing = dateMap.get(date);
    if (existing) {
      existing.expense = expense.amount;
    } else {
      dateMap.set(date, {
        date,
        income: 0,
        expense: expense.amount,
      });
    }
  });

  // Convert map to array and sort by date
  const chartData = Array.from(dateMap.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Date
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].payload.date}
                      </span>
                    </div>
                    {payload[0].payload.income !== undefined && (
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-emerald-500">
                          Income
                        </span>
                        <span className="font-bold text-emerald-500">
                          ${payload[0].payload.income}
                        </span>
                      </div>
                    )}
                    {payload[0].payload.expense !== undefined && (
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-red-500">
                          Expense
                        </span>
                        <span className="font-bold text-red-500">
                          ${payload[0].payload.expense}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
          connectNulls
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
          connectNulls
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
