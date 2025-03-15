import { ExpenseBase, Expense } from "../types/expense";
import { Response } from "../types/response";
import client from "./client";

interface GetExpnesesQuery {
  limit?: number;
  from?: string;
  to?: string;
  order?: "asc" | "desc";
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
  getExpenses: async ({ limit, from, to, order }: GetExpnesesQuery) => {
    const response = await client.get<Response<Expense[]>>(
      "/expense",
      {
        params: {
          limit,
          from,
          to,
          order,
        },
      }
    );
    return response.data.data;
  },
};
