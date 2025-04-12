import Typography from "@/components/common/Typography/Typography";
import { useCallback, useEffect, useState } from "react";
import { Period, STATUS } from "@/types/common";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionInfo from "@/components/TransactionInfo/TransactionInfo";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LineChart from "./LineChart";
import { Link } from "react-router";
import PeriodSelector from "@/components/shared/PeriodSelector";
import { ExpenseData, IncomeData } from "@/store/types/data";
import { getBothTransactions } from "@/lib/utils/transactions";
import EmptyState from "@/components/shared/EmptyState";

const Overview = () => {
  const [expenseData, setExpenseData] = useState<ExpenseData | null>(null);
  const [incomeData, setIncomeData] = useState<IncomeData | null>(null);
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.MONTH);

  console.log({ expenseData, incomeData, selectedPeriod });

  const fetchData = useCallback(async (period: Period = Period.MONTH) => {
    setStatus(STATUS.LOADING);
    try {
      const { expneseData, incomeData } = await getBothTransactions(
        period,
        true
      );
      setExpenseData(expneseData);
      setIncomeData(incomeData);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setStatus(STATUS.ERROR);
      setExpenseData(null);
      setIncomeData(null);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedPeriod);
  }, [selectedPeriod, fetchData]);

  if (!expenseData || !incomeData) {
    return <div>No data found</div>;
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-6 rounded-lg w-full sm:w-2/3 sm:border sm:border-gray-200">
      <div className="flex justify-between px-4 sm:px-0">
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
          amount={incomeData?.sum}
          currency="USD"
          sent={true}
          change={10}
        />
        <TransactionInfo
          title="Expenses"
          amount={expenseData?.sum}
          currency="USD"
          sent={false}
          change={10}
        />
      </div>
      <div className="flex grow gap-4">
        {status === STATUS.LOADING ? (
          <Skeleton className="h-[200px] w-full" />
        ) : incomeData?.incomes?.length || expenseData?.expenses?.length ? (
          <LineChart
            incomes={incomeData?.incomes}
            expenses={expenseData?.expenses}
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
