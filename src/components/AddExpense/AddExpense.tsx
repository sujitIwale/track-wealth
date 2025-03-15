import Modal from "../common/Modal/Modal";
import Typography from "../common/Typography/Typography";
import { expensesApi } from "../../api/expense";
import { useEffect, useState } from "react";
import AmountInput from "../AmountInput/AmountInput";
import { STATUS } from "../../types/common";
import { ExpenseBase } from "../../types/expense";
import { toast } from "sonner";
import CategorySelector from "./components/CategorySelector";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import expensesThunks from "@/store/thunks/expenses";
import { useAppDispatch } from "@/store/store";
import Spinner from "../common/Spinner/Spinner";
import AccountSelector from "./components/AccountSelector";
const initialExpense: ExpenseBase = {
  amount: 0,
  name: "",
  category: "food",
  accountType: "cash",
  comment: "",
  date: new Date(),
};

type AddExpenseProps = {
  expenseId?: string | null;
  open?: boolean;
  onClose?: () => void;
};

const AddExpense = ({ expenseId, open, onClose }: AddExpenseProps) => {
  const [expense, setExpense] = useState<ExpenseBase>(initialExpense);
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (expenseId) {
      expensesApi.getExpense(expenseId).then((_expense) => {
        if (_expense) {
          setExpense({
            amount: _expense.amount,
            name: _expense.name,
            category: _expense.category,
            accountType: _expense.accountType,
            comment: _expense.comment,
            date: new Date(_expense.createdAt),
          });
        }
      });
    }
  }, [expenseId]);

  const handleChange = (
    key: keyof ExpenseBase,
    value: ExpenseBase[keyof ExpenseBase]
  ) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    onClose?.();
    setExpense(initialExpense);
  };

  const handleSave = async () => {
    try {
      setStatus(STATUS.LOADING);
      if (expenseId) {
        await dispatch(
          expensesThunks.updateExpense({ id: expenseId, expense })
        );
      } else {
        await expensesApi.createExpense(expense);
      }
      handleClose();
      toast.success("Expense created successfully");
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setStatus(STATUS.IDLE);
    }
  };

  return (
    <Modal
      isOpen={open ?? false}
      onClose={handleClose}
      showCloseButton={false}
      size="full"
    >
      <Modal.Header className="flex items-center gap-2 py-4 px-2">
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X />
        </Button>
        <Typography variant="h6" className="pl-7">
          Add Expense
        </Typography>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleSave}
          disabled={status === STATUS.LOADING}
          className="w-10 h-10"
        >
          {status === STATUS.LOADING ? (
            <Spinner />
          ) : (
            <Check className="w-6 h-6" />
          )}
        </Button>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <CategorySelector
            value={expense.category}
            onValueChange={(val) => handleChange("category", val)}
          />
          <AccountSelector
            value={expense.accountType}
            onValueChange={(val) => handleChange("accountType", val)}
          />
        </div>
        <AmountInput
          value={expense.amount}
          onChange={(val) => handleChange("amount", val)}
        />
        <div className="flex flex-col gap-1">
          <Typography variant="body2" color="secondary">
            Title
          </Typography>
          <input
            type="text"
            placeholder="Enter expense title..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={expense.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Typography variant="body2" color="secondary">
            Date
          </Typography>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !expense.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {expense.date ? (
                  format(expense.date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={expense.date}
                onSelect={(date) => date && handleChange("date", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* <div className="flex flex-col gap-1">
          <Typography variant="body2" color="secondary">
            Category
          </Typography>
          <CategorySelector
            value={expense.category}
            onValueChange={(val) => handleChange("category", val)}
          />
        </div> */}
        <div className="flex flex-col gap-1">
          <Typography variant="body2" color="secondary">
            Comment
          </Typography>
          <textarea
            placeholder="Add a comment..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            value={expense.comment}
            onChange={(e) => handleChange("comment", e.target.value)}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpense;
