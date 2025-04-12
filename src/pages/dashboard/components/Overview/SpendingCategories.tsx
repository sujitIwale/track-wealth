import Typography from "@/components/common/Typography/Typography";
import EmptyState from "@/components/shared/EmptyState";
import PeriodSelector from "@/components/shared/PeriodSelector";
import { Categories } from "@/constants/expense";
import { getExpenses } from "@/lib/utils/transactions";
import { ExpenseData } from "@/store/types/data";
import { Period } from "@/types/common";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LegendProps,
} from "recharts";

type CategoryTotal = {
  name: string;
  value: number;
  icon: string;
  id: string;
};

const SpendingCategories = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.MONTH);
  const [expenseData, setExpenseData] = useState<ExpenseData | null>(null);

  useEffect(() => {
    const fetchExpenseData = async () => {
      const response = await getExpenses(selectedPeriod, false);
      setExpenseData(response.data);
    };
    fetchExpenseData();
  }, [selectedPeriod]);

  // Process expenses to get category-wise totals
  const categoryTotals =
    expenseData?.expenses.reduce((acc, expense) => {
      const category = Categories[expense.category];
      const existing = acc.find((item) => item.id === category.id);

      if (existing) {
        existing.value += expense.amount;
      } else {
        acc.push({
          name: category.name,
          value: expense.amount,
          icon: category.icon,
          id: category.id,
        });
      }
      return acc;
    }, [] as CategoryTotal[]) || [];

  const COLORS = [
    "hsl(221.2 83.2% 53.3%)", // Primary blue
    "hsl(142.1 76.2% 36.3%)", // Success green
    "hsl(346.8 77.2% 49.8%)", // Destructive red
    "hsl(24.6 95% 53.1%)", // Orange
    "hsl(262.1 83.3% 57.8%)", // Purple
    "hsl(48 96.5% 53.1%)", // Yellow
  ];

  const CustomizedLegend = (props: LegendProps) => {
    const { payload } = props;

    if (!payload) return null;

    return (
      <div className="grid grid-cols-2 gap-2 text-sm mt-4">
        {payload.map(
          (entry: { value: string; color?: string }, index: number) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color || "transparent" }}
              />
              <span className="flex items-center gap-1 text-muted-foreground">
                {categoryTotals.find((item) => item.name === entry.value)?.icon}
                {"  "}
                {entry.value}
              </span>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Typography variant="subtitle1" className="font-medium text-nowrap">
          Spending By Category
        </Typography>
        <PeriodSelector
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={(period: Period) => setSelectedPeriod(period)}
        />
      </div>
      {expenseData?.expenses.length ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={categoryTotals}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
            >
              {categoryTotals.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="stroke-background hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
              itemStyle={{
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend content={<CustomizedLegend />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState
          title="No expenses found"
          description="Please add some expenses"
        />
      )}
    </div>
  );
};

export default SpendingCategories;
