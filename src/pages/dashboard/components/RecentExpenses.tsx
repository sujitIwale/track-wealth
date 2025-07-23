import Typography from "@/components/common/Typography/Typography";
import ExpenseRow from "@/pages/expenses/components/ExpenseRow/ExpenseRow";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetExpensesQuery } from "@/store/query/transaction";

const RecentExpenses = () => {
  const { data } = useGetExpensesQuery({
    params: {
      limit: 5,
      order: "desc",
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <Typography variant="h6" className="text-gray-600">
          Recent Expenses
        </Typography>
        <Link to="/expenses">
          <Button variant="outline">View All</Button>
        </Link>
      </div>
      <div>
        {data?.expenses.map((expense) => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}

        {data?.expenses.length === 0 && (
          <Typography className="text-gray-500 text-center py-4">
            No recent expenses
          </Typography>
        )}
      </div>
    </div>
  );
};

export default RecentExpenses;
