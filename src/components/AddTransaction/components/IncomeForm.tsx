import { IncomeSource, IncomeSourcesList } from "@/constants/income";
import { AccountType, AccountTypesList } from "@/constants/expense";
import Selector from "./Selector";
import AmountInput from "@/components/AmountInput/AmountInput";
import { useTransaction } from "../context/TransactionContext";
import Typography from "@/components/common/Typography/Typography";
import { IncomeBase } from "@/types/transaction";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const IncomeForm = ({ currency }: { currency: string }) => {
  const { income, setIncome, validationErrors, clearValidationErrors } =
    useTransaction();

  const handleChange = (
    key: keyof IncomeBase,
    value: IncomeBase[keyof IncomeBase]
  ) => {
    setIncome((prev) => ({ ...prev, [key]: value }));
    // Clear validation errors when user starts typing
    if (validationErrors[key as keyof typeof validationErrors]) {
      clearValidationErrors();
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <Selector
          list={AccountTypesList}
          value={income.accountType}
          onValueChange={(val) =>
            handleChange("accountType", val as AccountType)
          }
        />
        <Selector
          list={IncomeSourcesList}
          value={income.source}
          onValueChange={(val) => handleChange("source", val as IncomeSource)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <AmountInput
          currency={currency}
          value={income.amount}
          onChange={(val) => handleChange("amount", val)}
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
          placeholder="Enter income title..."
          className={cn(
            "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            validationErrors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          )}
          value={income.name}
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
                !income.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {income.date ? (
                format(income.date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={new Date(income.date)}
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
          value={income.comment}
          onChange={(e) => handleChange("comment", e.target.value)}
        />
      </div>
    </>
  );
};

export default IncomeForm;
