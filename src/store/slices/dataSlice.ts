import { createSlice } from "@reduxjs/toolkit";
import expensesThunks from "../thunks/expenses";
import { Expense } from "@/types/expense";
import { STATUS } from "@/types/common";

interface DataState {
    expenses: Expense[];
    expenseStatus: STATUS;
}

const initialState: DataState = {
    expenseStatus: STATUS.IDLE,
    expenses: [],
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
        builder.addCase(expensesThunks.updateExpense.fulfilled, (state, action) => {
            state.expenses = state.expenses.map((expense) => expense.id === action.payload.data.id ? action.payload.data : expense);
        });
        builder.addCase(expensesThunks.deleteExpense.fulfilled, (state, action) => {
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload.data.id);
        });
    }
});

export default dataSlice