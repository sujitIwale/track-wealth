import { useState } from "react";
import { TransactionContext } from "./TransactionContext";
import { ExpenseBase } from "@/types/expense";
import { IncomeBase } from "@/types/transaction";
import { useAppDispatch } from "@/store/store";
import { STATUS } from "@/types/common";
import transactionsThunks from "@/store/thunks/transactions";
import { toast } from "sonner";

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
  const [expense, setExpense] = useState<ExpenseBase>(initialExpense);
  const [income, setIncome] = useState<IncomeBase>(initialIncome);
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);

  const save = async (type: "expense" | "income", id?: string) => {
    try {
      setStatus(STATUS.LOADING);
      if (type === "expense") {
        if (id) {
          await dispatch(transactionsThunks.updateExpense({ id, expense }));
          toast.success("Expense updated successfully");
        } else {
          await dispatch(transactionsThunks.createExpense(expense));
          toast.success("Expense created successfully");
        }
      } else {
        if (id) {
          await dispatch(transactionsThunks.updateIncome({ id, income }));
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

  const reset = () => {
    setExpense(initialExpense);
    setIncome(initialIncome);
    setStatus(STATUS.IDLE);
  };

  return (
    <TransactionContext.Provider
      value={{
        expense,
        setExpense,
        income,
        setIncome,
        status,
        save,
        reset,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
