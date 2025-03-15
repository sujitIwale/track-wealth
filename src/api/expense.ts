import { ExpenseBase, Expense } from "../types/expense";
import { Response } from "../types/response";
import client from "./client";

export  const expensesApi = {
  getExpense: async (id: string) => {
    const response = await client.get<Response<Expense>>(
      `/expense/${id}`
    );
    return response.data.data;
  },
  createExpense: async (data: ExpenseBase) => {
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
  getExpenses: async () => {
    const response = await client.get<Response<Expense[]>>(
      "/expense/all"
    );
    return response.data.data;
  },
};
