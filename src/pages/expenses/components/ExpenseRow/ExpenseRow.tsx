import React from "react";
import Typography from "@/components/common/Typography/Typography";
import { Expense } from "@/types/expense";
import ExpenseRowMenu from "./ExpenseRowMenu";
import { Categories } from "@/constants/expense";
import { useAppSelector } from "@/store/store";

type ExpenseRowProps = {
  expense: Expense;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense }) => {
  const currency = useAppSelector((state) => state.user.currency);
  const { id, amount, name, comment, category } = expense;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(amount);
  const isExpense = amount < 0;
  const categoryDetails = Categories[category];

  return (
    <div
      className="flex items-center justify-between gap-4 p-3 border-b border-gray-200 hover:bg-gray-50"
      key={id}
    >
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
          <span className="text-xl">{categoryDetails.icon}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-900 truncate flex-grow">
            {name}
          </p>
          <p className="text-xs text-gray-500 flex-shrink-0">
            {comment || "No comment"}
          </p>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex items-center">
          <Typography
            variant="body2"
            className={`text-sm font-medium ${
              isExpense ? "text-red-600" : "text-green-600"
            }`}
          >
            {formattedAmount}
          </Typography>
        </div>

        <ExpenseRowMenu expense={expense} />
      </div>
    </div>
  );
};

export default ExpenseRow;
