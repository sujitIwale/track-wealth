import { createApi } from "@reduxjs/toolkit/query/react";
import { ExpenseData, IncomeData } from "../types/data";
import baseQuery from "./baseQuery";

const transactionQuery = createApi({
  baseQuery: baseQuery, 
  endpoints: (builder) => ({
    getExpenses: builder.query<ExpenseData, {params: unknown}>({
      query: ({params}) => ({
        url: "/expenses",
        method: "GET",
        body: {},
        params,
      }),
    }),
    getIncomes: builder.query<IncomeData, {params: unknown}>({
      query: ({params}) => ({
        url: "/incomes",
        method: "GET",
        body: {},
        params,
      }),
    }),
  }),
});

export const { useGetExpensesQuery , useGetIncomesQuery } = transactionQuery;