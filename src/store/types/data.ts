import { Expense } from "@/types/expense";
import { Income } from "@/types/transaction";
export type ExpenseData = {
  sum: number;
  expenses: Expense[];
};

export type IncomeData = {
  sum: number;
  incomes: Income[];
};
