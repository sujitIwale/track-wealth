import { createSlice } from "@reduxjs/toolkit";
import expensesThunks from "../thunks/transactions";
import incomesThunks from "../thunks/transactions";
import { STATUS } from "@/types/common";
import { ExpenseData, IncomeData } from "../types/data";

interface DataState {
    expenseData: ExpenseData
    expenseStatus: STATUS;
    incomeData: IncomeData;
    incomeStatus: STATUS;
}

const initialState: DataState = {
    expenseStatus: STATUS.IDLE,
    expenseData: {sum:0,expenses:[]},
    incomeStatus: STATUS.IDLE,
    incomeData: {sum:0,incomes:[]}
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(expensesThunks.fetchAllExpenses.pending, (state) => {
            state.expenseStatus = STATUS.LOADING;
        });
        builder.addCase(expensesThunks.fetchAllExpenses.fulfilled, (state, action) => {
            state.expenseData.expenses = action.payload
            state.expenseStatus = STATUS.SUCCESS;
        });
        builder.addCase(expensesThunks.fetchAllExpenses.rejected, (state) => {
            state.expenseStatus = STATUS.ERROR;
        });
        builder.addCase(expensesThunks.createExpense.fulfilled, (state, action) => {
            state.expenseData.expenses.push(action.payload.data);
        });
        builder.addCase(expensesThunks.updateExpense.fulfilled, (state, action) => {
            state.expenseData.expenses = state.expenseData.expenses.map((expense) => expense.id === action.payload.data.id ? action.payload.data : expense);
        });
        builder.addCase(expensesThunks.deleteExpense.fulfilled, (state, action) => {
            state.expenseData.expenses = state.expenseData.expenses.filter((expense) => expense.id !== action.payload.data.id);
        });
        builder.addCase(expensesThunks.fetchExpenses.pending, (state) => {
            state.expenseStatus = STATUS.LOADING;
        });
        builder.addCase(expensesThunks.fetchExpenses.fulfilled, (state, action) => {
            state.expenseData = action.payload;
            state.expenseStatus = STATUS.SUCCESS;
        });
        builder.addCase(incomesThunks.fetchIncomes.pending, (state) => {
            state.incomeStatus = STATUS.LOADING;
        });
        builder.addCase(incomesThunks.fetchIncomes.fulfilled, (state, action) => {
            state.incomeData = action.payload;
            state.incomeStatus = STATUS.SUCCESS;
        });
        builder.addCase(incomesThunks.createIncome.fulfilled, (state, action) => {
            state.incomeData.incomes.push(action.payload.data);
        });
        builder.addCase(incomesThunks.updateIncome.fulfilled, (state, action) => {
            state.incomeData.incomes = state.incomeData.incomes.map((income) => income.id === action.payload.data.id ? action.payload.data : income);
        });
        builder.addCase(incomesThunks.deleteIncome.fulfilled, (state, action) => {
            state.incomeData.incomes = state.incomeData.incomes.filter((income) => income.id !== action.payload.data.id);
        });
    }
});

export default dataSlice