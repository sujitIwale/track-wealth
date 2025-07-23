import { createApi } from "@reduxjs/toolkit/query/react";
import { ExpenseData, IncomeData } from "../types/data";
import baseQuery from "./baseQuery";
import { Response } from "@/types/response";
import { ExpenseBase, Expense } from "@/types/expense";
import { IncomeBase, Income } from "@/types/transaction";

const transactionQuery = createApi({
  reducerPath: 'transaction',
  baseQuery: baseQuery,
  tagTypes: ['Expense', 'Income'],
  endpoints: (builder) => ({
    getExpenses: builder.query<ExpenseData, {params: unknown}>({
      query: ({params}) => ({
        url: "/expense",
        method: "GET",
        body: {},
        params,
      }),
      transformResponse: (response: Response<ExpenseData>) => response.data,
      providesTags: ['Expense'],
    }),
    getIncomes: builder.query<IncomeData, {params: unknown}>({
      query: ({params}) => ({
        url: "/income",
        method: "GET",
        body: {},
        params,
      }),
      transformResponse: (response: Response<IncomeData>) => response.data,
      providesTags: ['Income'],
    }),
    createExpense: builder.mutation<Response<Expense>, ExpenseBase>({
      query: (expense) => ({
        url: "/expense/create",
        method: "POST",
        body: expense,
        params: undefined,
      }),
      invalidatesTags: ['Expense'],
    }),
    updateExpense: builder.mutation<Response<Expense>, { id: string; expense: ExpenseBase }>({
      query: ({ id, expense }) => ({
        url: `/expense/update/${id}`,
        method: "PUT",
        body: expense,
        params: undefined,
      }),
      invalidatesTags: ['Expense'],
    }),
    deleteExpense: builder.mutation<Response<Expense>, string>({
      query: (id) => ({
        url: `/expense/delete/${id}`,
        method: "DELETE",
        body: undefined,
        params: undefined,
      }),
      invalidatesTags: ['Expense'],
    }),
    createIncome: builder.mutation<Response<Income>, IncomeBase>({
      query: (income) => ({
        url: "/income/create",
        method: "POST",
        body: income,
        params: undefined,
      }),
      invalidatesTags: ['Income'],
    }),
    updateIncome: builder.mutation<Response<Income>, { id: string; income: IncomeBase }>({
      query: ({ id, income }) => ({
        url: `/income/update/${id}`,
        method: "PUT",
        body: income,
        params: undefined,
      }),
      invalidatesTags: ['Income'],
    }),
    deleteIncome: builder.mutation<Response<Income>, string>({
      query: (id) => ({
        url: `/income/delete/${id}`,
        method: "DELETE",
        body: undefined,
        params: undefined,
      }),
      invalidatesTags: ['Income'],
    }),
  }),
});

export const { 
  useGetExpensesQuery, 
  useGetIncomesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = transactionQuery;

export default transactionQuery;