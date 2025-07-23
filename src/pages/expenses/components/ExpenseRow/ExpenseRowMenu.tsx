import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Expense } from "@/types/expense";
import { useDeleteExpenseMutation } from "@/store/query/transaction";
import { toast } from "sonner";

type ExpenseRowMenuProps = {
  expense: Expense;
};

const ExpenseRowMenu = ({ expense }: ExpenseRowMenuProps) => {
  const [deleteExpense] = useDeleteExpenseMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteExpense(expense.id).unwrap();
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete expense");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center rounded-full hover:bg-gray-100">
        <IoEllipsisVertical size={16} className="text-gray-600" />
        <span className="sr-only">Toggle menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        className="w-28 bg-white rounded-md shadow-lg border border-gray-200 z-50"
      >
        <DropdownMenuItem
          onClick={() =>
            navigate({
              pathname: `/transaction/expense/${expense.id}`,
            })
          }
          className="flex items-center px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExpenseRowMenu;
