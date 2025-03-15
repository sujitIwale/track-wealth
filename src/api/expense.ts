import { ExpenseBase, Expense } from "../types/expense";
import { Response } from "../types/response";
import client from "./client";

export  const expensesApi = {
  createExpense: async (data: ExpenseBase) => {
    const response = await client.post("/expense/create", data);
    return response.data;
  },
  getExpenses: async () => {
    const response = await client.get<Response<Expense[]>>(
      "/expense/all"
    );
    return response.data.data;
  },
};
