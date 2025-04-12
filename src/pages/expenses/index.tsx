import { useState, useMemo } from "react";
import { useEffect } from "react";
import { Expense } from "../../types/expense";
import ExpenseRow from "./components/ExpenseRow/ExpenseRow";
import Typography from "@/components/common/Typography/Typography";
import { Categories, Category } from "@/constants/expense";
import { X, Plus, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/store";
import expensesThunks from "@/store/thunks/transactions";
import StateRenderer from "@/components/layout/StateRenderer/StateRenderer";
import { STATUS } from "@/types/common";
import Spinner from "@/components/common/Spinner/Spinner";
import EmptyState from "@/components/shared/EmptyState";
import { Link } from "react-router";
import { setImportModal } from "@/store/slices/uiSlice";
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
  const [filters, setFilters] = useState<Filters>({
    month: "all",
    // year: "all",
    category: "all",
  });

  const dispatch = useAppDispatch();
  const { expenseData, expenseStatus } = useAppSelector((state) => state.data);

  useEffect(() => {
    dispatch(expensesThunks.fetchAllExpenses());
  }, [dispatch]);

  const groupedExpenses = useMemo(() => {
    const filteredExpenses = expenseData.expenses.filter((expense) => {
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
  }, [expenseData.expenses, filters]);

  const clearFilters = () => {
    setFilters({
      month: "all",
      category: "all",
    });
  };

  console.log({ expenseStatus, expenseData });

  return (
    <StateRenderer
      LayoutWrapper={({ children }) => children}
      isLoading={expenseStatus === STATUS.LOADING}
      isSuccess={expenseStatus === STATUS.SUCCESS}
      isFailure={expenseStatus === STATUS.ERROR}
      failure={() => <div>Error loading expenses</div>}
      default={() => <div>No expenses found</div>}
      loading={() => (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      )}
      success={() => (
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10  p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
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
              </div>

              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={filters.month === "all" && filters.category === "all"}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {groupedExpenses.length > 0 ? (
            groupedExpenses.map((group) => (
              <div
                key={group.date}
                className="flex flex-col gap-2 bg-white  border-gray-200 overflow-hidden"
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
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <EmptyState
                title="No expenses found"
                description="Please add some expenses"
                actions={
                  <div className="flex flex-col gap-4 mt-4 w-full">
                    <Button
                      variant="outline"
                      onClick={() => dispatch(setImportModal({ open: true }))}
                    >
                      <Import className="h-4 w-4" />
                      Import
                    </Button>
                    <Link to="/transaction/expense">
                      <Button className="w-full">
                        <Plus className="h-4 w-4" />
                        Add Expense
                      </Button>
                    </Link>
                  </div>
                }
                size="large"
                className="max-w-sm"
              />
            </div>
          )}
        </div>
      )}
    />
  );
};

export default Expenses;
