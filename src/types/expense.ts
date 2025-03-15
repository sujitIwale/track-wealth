
import { Category } from "../constants/expense";

export type ExpenseBase = {
  amount: number;
  name: string;
  category: Category;
  comment?: string;
  date: Date;
};

export type Expense = ExpenseBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};