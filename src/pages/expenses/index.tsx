import { useState, useMemo } from "react";
import { useEffect } from "react";
import { expensesApi } from "../../api/expense";
import { Expense } from "../../types/expense";
import ExpenseRow from "./components/ExpenseRow";
import Typography from "@/components/common/Typography/Typography";
import { Categories, Category } from "@/constants/expense";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExpenseGroup {
  date: string;
  expenses: Expense[];
  total: number;
}

interface Filters {
  month: string;
  // year: string;
  category: Category | "all";
}

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<Filters>({
    month: "all",
    // year: "all",
    category: "all",
  });

  useEffect(() => {
    expensesApi.getExpenses().then((data) => {
      setExpenses(data);
    });
  }, []);

  const groupedExpenses = useMemo(() => {
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      const matchesMonth =
        filters.month === "all" ||
        expenseDate.getMonth() === Number(filters.month);
      const matchesCategory =
        filters.category === "all" || expense.category === filters.category;

      return matchesMonth && matchesCategory;
    });

    return filteredExpenses.reduce<ExpenseGroup[]>((groups, expense) => {
      const date = new Date(expense.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const existingGroup = groups.find((group) => group.date === date);

      if (existingGroup) {
        existingGroup.expenses.push(expense);
        existingGroup.total += expense.amount;
        return groups;
      }

      groups.push({
        date,
        expenses: [expense],
        total: expense.amount,
      });
      return groups;
    }, []);
  }, [expenses, filters]);

  const clearFilters = () => {
    setFilters({
      month: "all",
      category: "all",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10  p-4 bg-white">
        <div className="flex gap-4 items-center">
          <Select
            value={filters.month}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, month: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Months</SelectItem>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {new Date(2000, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* <Select
            value={filters.year}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, year: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Years</SelectItem>
                {Array.from({ length: 5 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select> */}

          <Select
            value={filters.category}
            onValueChange={(value: Category | "all") =>
              setFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(Categories).map(([id, category]) => (
                  <SelectItem key={id} value={id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={clearFilters}
            className="h-10 w-10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {groupedExpenses.map((group) => (
        <div
          key={group.date}
          className="flex flex-col gap-2 bg-white border border-gray-200 overflow-hidden"
        >
          <div className="flex justify-between items-center py-3 px-4 bg-gray-50 border-b border-gray-200">
            <Typography variant="h6" className="text-gray-700">
              {group.date}
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium ${
                group.total < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(group.total)}
            </Typography>
          </div>

          <div className="flex flex-col">
            {group.expenses.map((expense) => (
              <ExpenseRow key={expense.id} expense={expense} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Expenses;
