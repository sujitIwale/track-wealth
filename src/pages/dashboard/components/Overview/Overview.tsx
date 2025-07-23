import Typography from "@/components/common/Typography/Typography";
import { useState } from "react";
import { Period } from "@/types/common";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionInfo from "@/components/TransactionInfo/TransactionInfo";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LineChart from "./LineChart";
import { Link } from "react-router";
import PeriodSelector from "@/components/shared/PeriodSelector";
import EmptyState from "@/components/shared/EmptyState";
import {
  useGetExpensesQuery,
  useGetIncomesQuery,
} from "@/store/query/transaction";

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.MONTH);
  const { data: expenseData, isLoading: isExpenseLoading } =
    useGetExpensesQuery({
      params: {
        period: Period.MONTH,
        giveSum: true,
      },
    });
  const { data: incomeData, isLoading: isIncomeLoading } = useGetIncomesQuery({
    params: {
      period: Period.MONTH,
      giveSum: true,
    },
  });

  const isLoading = isExpenseLoading || isIncomeLoading;

  return (
    <div className="flex flex-col gap-4 py-6 px-0 sm:px-4 rounded-lg w-full sm:w-2/3 sm:border sm:border-gray-200">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between">
          <Typography
            variant="subtitle2"
            className="text-gray-600 font-semibold"
          >
            Your Total Balance
          </Typography>
          <Typography variant="h4">{formatCurrency(1000, "USD")}</Typography>
        </div>
        <div className="flex gap-4">
          <PeriodSelector
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
          <Link to="/transaction/expense" className="hidden sm:block">
            <Button variant="default">
              <Plus size={20} />
              Add Transaction
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center sm:justify-start gap-8 px-4 sm:px-0">
        <TransactionInfo
          title="Income"
          amount={incomeData?.sum ?? 0}
          currency="USD"
          sent={true}
          change={10}
        />
        <TransactionInfo
          title="Expenses"
          amount={expenseData?.sum ?? 0}
          currency="USD"
          sent={false}
          change={10}
        />
      </div>
      <div className="flex grow gap-4">
        {isLoading ? (
          <Skeleton className="h-[200px] w-full" />
        ) : incomeData?.incomes?.length || expenseData?.expenses?.length ? (
          <LineChart
            incomes={incomeData?.incomes ?? []}
            expenses={expenseData?.expenses ?? []}
          />
        ) : (
          <EmptyState
            title="No transactions found"
            description="Please add some transactions"
          />
        )}
      </div>
    </div>
  );
};

export default Overview;
