import { useEffect, useState } from "react";
import { expensesApi } from "@/api/transaction";
import Typography from "@/components/common/Typography/Typography";
import { Expense } from "@/types/expense";
import ExpenseRow from "@/pages/expenses/components/ExpenseRow/ExpenseRow";
import { NavLink } from "react-router";

const RecentExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchRecentExpenses = async () => {
      const recentExpenses = await expensesApi.getExpenses({
        limit: 5,
        order: "desc",
        // sort: "date",
        // order: "desc"
      });
      setExpenses(recentExpenses.expenses);
    };

    fetchRecentExpenses();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center px-4 my-4">
        <Typography variant="h6" className="text-gray-600">
          Recent Expenses
        </Typography>
        <NavLink to="/expenses" className="text-primary">
          View All
        </NavLink>
      </div>
      <div>
        {expenses.map((expense) => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}

        {expenses.length === 0 && (
          <Typography className="text-gray-500 text-center py-4">
            No recent expenses
          </Typography>
        )}
      </div>
    </div>
  );
};

export default RecentExpenses;
