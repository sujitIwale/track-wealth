import { expensesApi } from "@/api/expense";
import {  ExpenseBase } from "@/types/expense";
import { createAsyncThunk } from "@reduxjs/toolkit";

const expensesThunks = {
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
  updateExpense : createAsyncThunk(
    "expenses/update",
    async ({ id, expense }: { id: string; expense: ExpenseBase }, { rejectWithValue }) => {
      console.log({id, expense})
      try {
        const data = await expensesApi.updateExpense(id, expense);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),
  deleteExpense: createAsyncThunk(
    "expenses/delete",
    async (id: string, { rejectWithValue }) => {
      try {
        const data = await expensesApi.deleteExpense(id);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),
};

export default expensesThunks;