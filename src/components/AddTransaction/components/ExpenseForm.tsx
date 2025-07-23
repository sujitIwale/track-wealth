import { PopoverContent } from "@/components/ui/popover";
import { useTransaction } from "../context/TransactionContext";
import { ExpenseBase } from "@/types/expense";
import AmountInput from "@/components/AmountInput/AmountInput";
import Typography from "@/components/common/Typography/Typography";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Selector from "./Selector";
import { CategoriesList, AccountTypesList } from "@/constants/expense";

const ExpenseForm = ({ currency }: { currency: string }) => {
  const { expense, setExpense, validationErrors, clearValidationErrors } =
    useTransaction();

  const handleChange = (
    key: keyof ExpenseBase,
    value: ExpenseBase[keyof ExpenseBase]
  ) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
    // Clear validation errors when user starts typing
    if (validationErrors[key as keyof typeof validationErrors]) {
      clearValidationErrors();
    }
  };

  //   useEffect(() => {
  //     if (expenseId) {
  //       expensesApi.getExpense(expenseId).then((_expense) => {
  //         if (_expense) {
  //           setExpense({
  //             amount: _expense.amount,
  //             name: _expense.name,
  //             category: _expense.category,
  //             accountType: _expense.accountType,
  //             comment: _expense.comment,
  //             date: new Date(_expense.createdAt).getTime(),
  //           });
  //         }
  //       });
  //     }
  //   }, [expenseId]);

  return (
    <>
      <div className="flex items-center gap-2">
        <Selector
          list={CategoriesList}
          value={expense.category}
          onValueChange={(val) => handleChange("category", val)}
        />
        <Selector
          list={AccountTypesList}
          value={expense.accountType}
          onValueChange={(val) => handleChange("accountType", val)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <AmountInput
          value={expense.amount}
          onChange={(val) => handleChange("amount", val)}
          currency={currency || "USD"}
        />
        {validationErrors.amount && (
          <Typography variant="body2" className="text-red-500 text-sm">
            {validationErrors.amount}
          </Typography>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Typography variant="body2" color="secondary">
          Title
        </Typography>
        <input
          type="text"
          placeholder="Enter expense title..."
          className={cn(
            "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            validationErrors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          )}
          value={expense.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {validationErrors.name && (
          <Typography variant="body2" className="text-red-500 text-sm">
            {validationErrors.name}
          </Typography>
        )}
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
              selected={new Date(expense.date)}
              onSelect={(date) => date && handleChange("date", date.getTime())}
              initialFocus
              showOutsideDays={false}
            />
          </PopoverContent>
        </Popover>
      </div>
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
    </>
  );
};

export default ExpenseForm;
