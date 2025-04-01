import Typography from "@/components/common/Typography/Typography";
import { useEffect, useState } from "react";
import { STATUS } from "@/types/common";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/store/store";
import TransactionInfo from "@/components/TransactionInfo/TransactionInfo";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LineChart from "./LineChart";
import transactionsThunks from "@/store/thunks/transactions";
import { Link } from "react-router";
import PeriodSelector from "@/components/shared/PeriodSelector";

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");
  const { expenseData, incomeData, expenseStatus } = useAppSelector(
    (state) => state.data
  );

  console.log({ expenseData });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const from = new Date();
    const to = new Date();
    switch (selectedPeriod) {
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

    dispatch(
      transactionsThunks.fetchExpenses({
        from: from.toISOString(),
        to: to.toISOString(),
        order: "asc",
        giveSum: true,
      })
    );

    dispatch(
      transactionsThunks.fetchIncomes({
        from: from.toISOString(),
        to: to.toISOString(),
        order: "asc",
        giveSum: true,
      })
    );
  }, [selectedPeriod, dispatch]);

  return (
    <>
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
      <div className="flex justify-center gap-8 px-4 sm:px-0">
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
      <div className="flex gap-4 mt-4">
        <div className="grow">
          {expenseStatus === STATUS.LOADING ? (
            <Skeleton className="h-[200px] w-full" />
          ) : incomeData?.incomes?.length || expenseData?.expenses?.length ? (
            <LineChart
              incomes={incomeData?.incomes}
              expenses={expenseData?.expenses}
            />
          ) : (
            <Typography
              variant="subtitle1"
              className="text-gray-600 font-semibold"
            >
              No transactions found , Please add some transactions
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

// const Overview = () => {
//   const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
//   const [selectedTab, setSelectedTab] = useState("month");
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const currency = useAppSelector((state) => state.user.currency);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       setStatus(STATUS.LOADING);
//       try {
//         const to = new Date();
//         const from = new Date();
//         let response;

//         if (selectedTab === "all") {
//           response = await expensesApi.getExpenses({ order: "asc" });
//         } else {
//           switch (selectedTab) {
//             case "week":
//               from.setDate(from.getDate() - 7);
//               break;
//             case "month":
//               from.setMonth(from.getMonth() - 1);
//               break;
//             case "year":
//               from.setFullYear(from.getFullYear() - 1);
//               break;
//           }
//           console.log(from.getDate());
//           response = await expensesApi.getExpenses({
//             from: from.toISOString(),
//             to: to.toISOString(),
//             order: "asc",
//           });
//         }
//         setExpenses(response);
//         setStatus(STATUS.SUCCESS);
//       } catch (error: unknown) {
//         setStatus(STATUS.ERROR);
//         console.log(error);
//       }
//     };

//     fetchExpenses();
//   }, [selectedTab]);

//   const getTitle = () => {
//     switch (selectedTab) {
//       case "all":
//         return "All Time Expenses";
//       case "day":
//         return "Today's Expenses";
//       case "week":
//         return "This Week's Expenses";
//       case "month":
//         return "This Month's Expenses";
//       case "year":
//         return "This Year's Expenses";
//       default:
//         return "Expenses";
//     }
//   };

//   const totalAmount = expenses.reduce(
//     (sum, expense) => sum + expense.amount,
//     0
//   );

//   return (
//     <div className="flex justify-center ">
//       <div className="flex flex-col gap-4 p-4 mb-10 sm:max-w-[800px]">
//         <div className="flex flex-col gap-2 items-center justify-between">
//           <Typography variant="h6" className="text-gray-600 font-semibold">
//             {getTitle()}
//           </Typography>
//           {status === STATUS.LOADING ? (
//             <Skeleton className="h-6 w-24" />
//           ) : (
//             <Typography variant="h6" className="text-primary font-bold">
//               {currency ? currenciesMap[currency].symbol : "$"}
//               {totalAmount.toLocaleString()}
//             </Typography>
//           )}
//         </div>
//         {status === STATUS.LOADING ? (
//           <Skeleton className="h-[200px] w-full" />
//         ) : (
//           <Chart expenses={expenses} />
//         )}
//         <Tabs
//           defaultValue="month"
//           onValueChange={(value) => setSelectedTab(value)}
//           className="w-full"
//         >
//           <TabsList className="w-full grid grid-cols-5">
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="day">Day</TabsTrigger>
//             <TabsTrigger value="week">Week</TabsTrigger>
//             <TabsTrigger value="month">Month</TabsTrigger>
//             <TabsTrigger value="year">Year</TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

export default Overview;
