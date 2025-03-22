import Typography from "@/components/common/Typography/Typography";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chart from "./Chart";
import { useEffect, useState } from "react";
import { Expense } from "@/types/expense";
import { expensesApi } from "@/api/expense";
import { STATUS } from "@/types/common";
import { Skeleton } from "@/components/ui/skeleton";

const Overview = () => {
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const [selectedTab, setSelectedTab] = useState("month");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      setStatus(STATUS.LOADING);
      try {
        const to = new Date();
        const from = new Date();
        let response;

        if (selectedTab === "all") {
          response = await expensesApi.getExpenses({ order: "asc" });
        } else {
          switch (selectedTab) {
            case "week":
              from.setDate(from.getDate() - 7);
              break;
            case "month":
              from.setMonth(from.getMonth() - 1);
              break;
            case "year":
              from.setFullYear(from.getFullYear() - 1);
              break;
          }
          console.log(from.getDate());
          response = await expensesApi.getExpenses({
            from: from.toISOString(),
            to: to.toISOString(),
            order: "asc",
          });
        }
        setExpenses(response);
        setStatus(STATUS.SUCCESS);
      } catch (error: unknown) {
        setStatus(STATUS.ERROR);
        console.log(error);
      }
    };

    fetchExpenses();
  }, [selectedTab]);

  const getTitle = () => {
    switch (selectedTab) {
      case "all":
        return "All Time Expenses";
      case "day":
        return "Today's Expenses";
      case "week":
        return "This Week's Expenses";
      case "month":
        return "This Month's Expenses";
      case "year":
        return "This Year's Expenses";
      default:
        return "Expenses";
    }
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <>
      <div className="flex flex-col gap-4 p-4 mb-10">
        <div className="flex flex-col gap-2 items-center justify-between">
          <Typography variant="h6" className="text-gray-600 font-semibold">
            {getTitle()}
          </Typography>
          {status === STATUS.LOADING ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <Typography variant="h6" className="text-primary font-bold">
              ${totalAmount.toLocaleString()}
            </Typography>
          )}
        </div>
        {status === STATUS.LOADING ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <Chart expenses={expenses} />
        )}
        <Tabs
          defaultValue="month"
          onValueChange={(value) => setSelectedTab(value)}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default Overview;
