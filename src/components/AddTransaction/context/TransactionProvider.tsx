import { useState } from "react";
import { TransactionContext } from "./TransactionContext";
import { ExpenseBase } from "@/types/expense";
import { IncomeBase } from "@/types/transaction";
import { STATUS } from "@/types/common";
import { toast } from "sonner";
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
} from "@/store/query/transaction";

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
  const [expense, setExpense] = useState<ExpenseBase>(initialExpense);
  const [income, setIncome] = useState<IncomeBase>(initialIncome);
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);

  const [createExpense] = useCreateExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [createIncome] = useCreateIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();

  const save = async (type: "expense" | "income", id?: string) => {
    try {
      setStatus(STATUS.LOADING);
      if (type === "expense") {
        if (id) {
          await updateExpense({ id, expense }).unwrap();
          toast.success("Expense updated successfully");
        } else {
          await createExpense(expense).unwrap();
          toast.success("Expense created successfully");
        }
      } else {
        if (id) {
          await updateIncome({ id, income }).unwrap();
          toast.success("Income updated successfully");
        } else {
          await createIncome(income).unwrap();
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
