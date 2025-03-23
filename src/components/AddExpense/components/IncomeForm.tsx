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

const IncomeForm = () => {
  const { income, setIncome } = useTransaction();

  const handleChange = (
    key: keyof IncomeBase,
    value: IncomeBase[keyof IncomeBase]
  ) => {
    setIncome((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <Selector
          list={AccountTypesList}
          value={income.accountType}
          onValueChange={(val) =>
            setIncome({ ...income, accountType: val as AccountType })
          }
        />
        <Selector
          list={IncomeSourcesList}
          value={income.source}
          onValueChange={(val) =>
            setIncome({ ...income, source: val as IncomeSource })
          }
        />
      </div>
      <AmountInput
        value={income.amount}
        onChange={(val) => setIncome({ ...income, amount: val })}
      />
      <div className="flex flex-col gap-1">
        <Typography variant="body2" color="secondary">
          Title
        </Typography>
        <input
          type="text"
          placeholder="Enter expense title..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={income.name}
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
