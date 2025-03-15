import React from "react";
import {
  FaShoppingCart,
  FaUtensils,
  FaHome,
  FaCar,
  FaPlane,
  FaQuestion,
} from "react-icons/fa";
import { Expense } from "../../../types/expense";
import Typography from "@/components/common/Typography/Typography";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { IoEllipsisVertical } from "react-icons/io5";

type ExpenseRowProps = {
  expense: Expense;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const getCategoryIcon = (category: string) => {
  const lowerCategory = category.toLowerCase();

  if (lowerCategory.includes("food")) {
    return { icon: FaUtensils, color: "bg-orange-100 text-orange-500" };
  }
  if (lowerCategory.includes("shopping")) {
    return { icon: FaShoppingCart, color: "bg-blue-100 text-blue-500" };
  }
  if (lowerCategory.includes("home")) {
    return { icon: FaHome, color: "bg-green-100 text-green-500" };
  }
  if (lowerCategory.includes("transport")) {
    return { icon: FaCar, color: "bg-purple-100 text-purple-500" };
  }
  if (lowerCategory.includes("travel")) {
    return { icon: FaPlane, color: "bg-indigo-100 text-indigo-500" };
  }

  return { icon: FaQuestion, color: "bg-gray-100 text-gray-500" };
};

const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense }) => {
  const { id, amount, name, comment, category } = expense;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  const isExpense = amount < 0;
  const { icon: CategoryIcon, color: categoryColor } =
    getCategoryIcon(category);

  return (
    <div
      className="flex items-center justify-between gap-4 p-3 border-b border-gray-200 hover:bg-gray-50"
      key={id}
    >
      <div className="flex items-center gap-6">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${categoryColor}`}
        >
          <CategoryIcon className="h-5 w-5" />
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

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <IoEllipsisVertical size={16} color="black" />
            <span className="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="bottom">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <IconButton
          icon={<FaEllipsisV className="h-4 w-4" color="black" />}
          className="p-1 text-gray-400 hover:text-gray-600"
          aria-label="More options"
          onClick={() => {}}
        /> */}
      </div>
    </div>
  );
};

export default ExpenseRow;
