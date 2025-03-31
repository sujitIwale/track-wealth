import { Income, IncomeBase } from "@/types/transaction";
import { ExpenseBase, Expense } from "../types/expense";
import { Response } from "../types/response";
import client from "./client";

export interface GetExpnesesQuery {
  limit?: number;
  from?: string;
  to?: string;
  order?: "asc" | "desc";
  giveSum?: boolean;
}

export interface GetIncomesQuery {
  limit?: number;
  from?: string;
  to?: string;
  order?: "asc" | "desc";
  giveSum?: boolean;
}

export  const expensesApi = {
  getExpense: async (id: string) => {
    const response = await client.get<Response<Expense>>(
      `/expense/${id}`
    );
    return response.data.data;
  },
  createExpense: async (data: ExpenseBase) => {
    console.log({ data });
    const response = await client.post("/expense/create", data);
    return response.data;
  },
  updateExpense: async (id: string, data: ExpenseBase) => {
    const response = await client.put<Response<Expense>>(
      `/expense/update/${id}`,
      data
    );
    return response.data;
  },
  deleteExpense: async (id: string) => {
    const response = await client.delete<Response<Expense>>(
      `/expense/delete/${id}`
    );
    return response.data;
  },
  getAllExpenses: async () => {
    const response = await client.get<Response<Expense[]>>(
      "/expense/all"
    );
    return response.data.data;
  },
  getExpenses: async ({ limit, from, to, order,giveSum }: GetExpnesesQuery) => {
    const response = await client.get<Response<{sum:number,expenses:Expense[]}>>(
      "/expense",
      {
        params: {
          limit,
          from,
          to,
          order,
          giveSum,
        },
      }
    );
    return response.data.data;
  },
};

export const incomesApi = {
  getIncome: async (id: string) => {
    const response = await client.get<Response<Income>>(
      `/income/${id}`
    );
    return response.data.data;
  },
  createIncome: async (data: IncomeBase) => {
    const response = await client.post("/income/create", data);
    return response.data;
  },
  updateIncome: async (id: string, data: IncomeBase) => {
    const response = await client.put<Response<Income>>(
      `/income/update/${id}`,
      data
    );
    return response.data;
  },
  deleteIncome: async (id: string) => {
    const response = await client.delete<Response<Income>>(
      `/income/delete/${id}`
    );
    return response.data;
  },
  getIncomes: async ({ limit, from, to, order,giveSum }: GetIncomesQuery) => {
    const response = await client.get<Response<{sum:number,incomes:Income[]}>>("/income",
      {
        params: { limit, from, to, order,giveSum },
      }
    );
    return response.data.data;
  },
};
