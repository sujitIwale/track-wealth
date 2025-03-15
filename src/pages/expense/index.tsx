import AddExpense from "@/components/AddExpense/AddExpense";
import { useNavigate, useSearchParams } from "react-router";

const Expense = () => {
  const [searchParams] = useSearchParams();
  const expenseId = searchParams.get("expenseId");
  const navigate = useNavigate();

  const onClose = () => {
    searchParams.delete("expenseId");
    navigate(-1);
  };

  return <AddExpense expenseId={expenseId} open={true} onClose={onClose} />;
};

export default Expense;
