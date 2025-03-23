import { IncomeSource } from "@/constants/income";
import { AccountType } from "@/constants/expense";

export type IncomeBase = {
  amount: number;
  date: number;
  name: string;
  accountType: AccountType;
  source: IncomeSource;
  comment?: string;
};

export type Income = IncomeBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
