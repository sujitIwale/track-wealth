import { ExpenseBase } from "@/types/expense";
import { IncomeBase } from "@/types/transaction";
import { STATUS } from "@/types/common";
import { createContext, useContext } from "react";

type ValidationErrors = {
  amount?: string;
  name?: string;
};

type TransactionContextType = {
  expense: ExpenseBase;
  setExpense: (expense: ExpenseBase | ((prev: ExpenseBase) => ExpenseBase)) => void;
  income: IncomeBase;
  setIncome: (income: IncomeBase | ((prev: IncomeBase) => IncomeBase)) => void;
  status: STATUS;
  validationErrors: ValidationErrors;
  clearValidationErrors: () => void;
  validate: (type: "expense" | "income") => boolean;
  save: (type: "expense" | "income", id?: string) => Promise<boolean>;
  reset: () => void;
};

export const TransactionContext = createContext<TransactionContextType | null>(
  null
);

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};  