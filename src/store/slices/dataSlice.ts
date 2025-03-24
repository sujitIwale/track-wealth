import { createSlice } from "@reduxjs/toolkit";
import expensesThunks from "../thunks/transactions";
import incomesThunks from "../thunks/transactions";
import { Expense } from "@/types/expense";
import { STATUS } from "@/types/common";
import { Income } from "@/types/transaction";

interface DataState {
    expenses: Expense[];
    expenseStatus: STATUS;
    incomes: Income[];
}

const initialState: DataState = {
    expenseStatus: STATUS.IDLE,
    expenses: [],
    incomes: []
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
            state.expenses = action.payload;
            state.expenseStatus = STATUS.SUCCESS;
        });
        builder.addCase(expensesThunks.fetchAllExpenses.rejected, (state) => {
            state.expenseStatus = STATUS.ERROR;
        });
        builder.addCase(expensesThunks.createExpense.fulfilled, (state, action) => {
            state.expenses.push(action.payload.data);
        });
        builder.addCase(expensesThunks.updateExpense.fulfilled, (state, action) => {
            state.expenses = state.expenses.map((expense) => expense.id === action.payload.data.id ? action.payload.data : expense);
        });
        builder.addCase(expensesThunks.deleteExpense.fulfilled, (state, action) => {
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload.data.id);
        });
        builder.addCase(incomesThunks.createIncome.fulfilled, (state, action) => {
            state.incomes.push(action.payload.data);
        });
        builder.addCase(incomesThunks.updateIncome.fulfilled, (state, action) => {
            state.incomes = state.incomes.map((income) => income.id === action.payload.data.id ? action.payload.data : income);
        });
        builder.addCase(incomesThunks.deleteIncome.fulfilled, (state, action) => {
            state.incomes = state.incomes.filter((income) => income.id !== action.payload.data.id);
        });
    }
});

export default dataSlice