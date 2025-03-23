import { useEffect, useState } from "react";
import { TransactionContext } from "./TransactionContext";
import { ExpenseBase } from "@/types/expense";
import { IncomeBase } from "@/types/transaction";
import { useAppDispatch } from "@/store/store";
import { STATUS } from "@/types/common";
import { useSearchParams } from "react-router";
import transactionsThunks from "@/store/thunks/transactions";
import { toast } from "sonner";
import { expensesApi, incomesApi } from "@/api/transaction";

const initialExpense: ExpenseBase = {
  amount: 0,
  name: "",
  category: "food",
  accountType: "bank",
  comment: "",
  date: Date.now(),
};

const initialIncome: IncomeBase = {
  amount: 0,
  name: "",
  source: "salary",
  accountType: "bank",
  comment: "",
  date: Date.now(),
};

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [expense, setExpense] = useState<ExpenseBase>(initialExpense);
  const [income, setIncome] = useState<IncomeBase>(initialIncome);
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const [searchParams] = useSearchParams();
  const expenseId = searchParams.get("expenseId");
  const incomeId = searchParams.get("incomeId");

  useEffect(() => {
    if (expenseId) {
      expensesApi.getExpense(expenseId).then((_expense) => {
        if (_expense) {
          setExpense({
            amount: _expense.amount,
            name: _expense.name,
            category: _expense.category,
            accountType: _expense.accountType,
            comment: _expense.comment,
            date: new Date(_expense.createdAt).getTime(),
          });
        }
      });
    } else if (incomeId) {
      incomesApi.getIncome(incomeId).then((_income) => {
        if (_income) {
          setIncome({
            amount: _income.amount,
            name: _income.name,
            source: _income.source,
            accountType: _income.accountType,
            comment: _income.comment,
            date: new Date(_income.createdAt).getTime(),
          });
        }
      });
    }
  }, [expenseId, incomeId]);

  const save = async () => {
    try {
      setStatus(STATUS.LOADING);
      if (type === "expense") {
        if (expenseId) {
          await dispatch(
            transactionsThunks.updateExpense({ id: expenseId, expense })
          );
          toast.success("Expense updated successfully");
        } else {
          await dispatch(transactionsThunks.createExpense(expense));
          toast.success("Expense created successfully");
        }
      } else {
        if (incomeId) {
          await dispatch(
            transactionsThunks.updateIncome({ id: incomeId, income })
          );
          toast.success("Income updated successfully");
        } else {
          await dispatch(transactionsThunks.createIncome(income));
          toast.success("Income created successfully");
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return false;
    } finally {
      setStatus(STATUS.IDLE);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        type,
        setType,
        expense,
        setExpense,
        income,
        setIncome,
        status,
        save,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
