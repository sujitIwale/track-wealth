
import { Category, AccountType } from "../constants/expense";

export type ExpenseBase = {
  amount: number;
  name: string;
  category: Category;
  accountType: AccountType;
  comment?: string;
  date: Date;
};

export type Expense = ExpenseBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};