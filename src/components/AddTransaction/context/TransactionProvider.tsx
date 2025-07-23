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

type ValidationErrors = {
  amount?: string;
  name?: string;
};

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [expense, setExpense] = useState<ExpenseBase>(initialExpense);
  const [income, setIncome] = useState<IncomeBase>(initialIncome);
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const [createExpense] = useCreateExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [createIncome] = useCreateIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();

  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  const validate = (type: "expense" | "income"): boolean => {
    const data = type === "expense" ? expense : income;
    const errors: ValidationErrors = {};

    // Validate amount
    if (!data.amount || data.amount <= 0) {
      errors.amount = "Amount must be greater than 0";
    }

    // Validate name
    if (!data.name || data.name.trim() === "") {
      errors.name = "Title is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const save = async (type: "expense" | "income", id?: string) => {
    // Clear previous validation errors
    clearValidationErrors();

    // Validate the data before saving
    if (!validate(type)) {
      toast.error("Please fix the validation errors");
      return false;
    }

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
    clearValidationErrors();
  };

  return (
    <TransactionContext.Provider
      value={{
        expense,
        setExpense,
        income,
        setIncome,
        status,
        validationErrors,
        clearValidationErrors,
        validate,
        save,
        reset,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
