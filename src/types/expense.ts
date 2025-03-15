
import { Category } from "../constants/expense";

export type ExpenseBase = {
  amount: number;
  name: string;
  category: Category;
  comment?: string;
};

export type Expense = ExpenseBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};