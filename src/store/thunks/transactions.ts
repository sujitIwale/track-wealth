import { expensesApi, GetExpnesesQuery, GetIncomesQuery, incomesApi } from "@/api/transaction";
import {  ExpenseBase } from "@/types/expense";
import { IncomeBase } from "@/types/transaction";
import { createAsyncThunk } from "@reduxjs/toolkit";

const transactionsThunks = {
  fetchAllExpenses: createAsyncThunk(
    "expenses/get-all",
    async (_, { rejectWithValue }) => {
      try {
        const data = await expensesApi.getAllExpenses();
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),
  fetchExpenses: createAsyncThunk(
    "expenses/get",
    async ({ from, to, order,giveSum }:GetExpnesesQuery, { rejectWithValue }) => {
      try {
        const data = await expensesApi.getExpenses({ from, to, order,giveSum });  
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),
  fetchIncomes: createAsyncThunk(
    "incomes/get",
    async ({ from, to, order,giveSum }:GetIncomesQuery, { rejectWithValue }) => {
      try {
        const data = await incomesApi.getIncomes({ from, to, order,giveSum });  
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),
  
  createExpense: createAsyncThunk(
    "expenses/create",
    async (expense: ExpenseBase, { rejectWithValue }) => {
      try {
        const data = await expensesApi.createExpense(expense);
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
  createIncome: createAsyncThunk(
    "incomes/create",
    async (income: IncomeBase, { rejectWithValue }) => {
      try {
        const data = await incomesApi.createIncome(income);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),
  updateIncome: createAsyncThunk(
    "incomes/update",
    async ({ id, income }: { id: string; income: IncomeBase }, { rejectWithValue }) => {
      try {
        const data = await incomesApi.updateIncome(id, income);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),
  deleteIncome: createAsyncThunk(
    "incomes/delete",
    async (id: string, { rejectWithValue }) => {
      try {
        const data = await incomesApi.deleteIncome(id);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),    
};

export default transactionsThunks;