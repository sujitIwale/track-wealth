import { expensesApi } from "@/api/expense";
import { Expense } from "@/types/expense";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const expensesThunks = {
  fetchAllExpenses: createAsyncThunk(
    "expenses/get-all",
    async (_, { rejectWithValue }) => {
      try {
        const data = await expensesApi.getExpenses();
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),
};

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async (expense: Expense, { rejectWithValue }) => {
    try {
      const data = await expensesApi.updateExpense(expense.id, expense);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
