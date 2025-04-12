import { expensesApi, GetExpnesesQuery, GetIncomesQuery, incomesApi } from "@/api/transaction";
import { ExpenseData } from "@/store/types/data";
import { IncomeData } from "@/store/types/data";
import { AxiosError } from "axios";

export const getIncomes = async (period: 'month' | 'week' | 'day' | 'year' | 'all', giveSum: boolean,params?: GetExpnesesQuery | GetIncomesQuery): Promise<{data:IncomeData | null ,msg:string | null}> => {
    const from = new Date();
    const to = new Date();
    switch (period) {
      case "month":
        from.setMonth(from.getMonth() - 1);
        break;
      case "week":
        from.setDate(from.getDate() - 7);
        break;
      case "day":
        from.setDate(from.getDate() - 1);
        break;
      case "year":
        from.setFullYear(from.getFullYear() - 1);
        break;
    }

    try {
        return {
            data:await incomesApi.getIncomes({
                from: from.toISOString(),
                to: to.toISOString(),
                giveSum,
                ...params,
            }),
            msg:null
        }
    } catch (error) {
        console.error(error);
        return {
            data:null,
            msg:error instanceof AxiosError ? error.response?.data.msg : 'Something went wrong'
        }
    }
};

export const getExpenses = async (period: 'month' | 'week' | 'day' | 'year' | 'all', giveSum: boolean,params?: GetExpnesesQuery | GetIncomesQuery): Promise<{data:ExpenseData | null ,msg:string | null}> => {
    const from = new Date();
    const to = new Date();
    switch (period) {
      case "month":
        from.setMonth(from.getMonth() - 1);
        break;
      case "week":
        from.setDate(from.getDate() - 7);
        break;
      case "day":
        from.setDate(from.getDate() - 1);
        break;
      case "year":
        from.setFullYear(from.getFullYear() - 1);
        break;
    }

    try {
        return {
            data:await expensesApi.getExpenses({
                from: from.toISOString(),
                to: to.toISOString(),
                giveSum,
                ...params,
            }),
            msg:null
        }
    } catch (error) {
        console.error(error);
        return {
            data:null,
            msg:error instanceof AxiosError ? error.response?.data.msg : 'Something went wrong'
        }
    }
};




export const getBothTransactions = async (period: 'month' | 'week' | 'day' | 'year' | 'all', giveSum: boolean,params?: GetExpnesesQuery | GetIncomesQuery) => {
    const [expenses, incomes] = await Promise.allSettled([
        getExpenses(period, giveSum, params),
        getIncomes(period, giveSum, params),
    ]);

    return {
        expneseData: expenses.status === 'fulfilled' ? expenses.value.data : null,
        incomeData: incomes.status === 'fulfilled' ? incomes.value.data : null,
    };
};
