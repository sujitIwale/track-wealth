import { cn } from "@/lib/utils";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

type SwitchProps = {
  value: "income" | "expense";
  onChange: (value: "income" | "expense") => void;
};

const selectedClass = "bg-black text-white";

const Switch = ({ value, onChange }: SwitchProps) => {
  return (
    <div className="flex bg-gray-100 rounded-3xl max-w-fit">
      <button
        className={cn(
          "px-4 py-2 rounded-3xl flex items-center gap-2",
          value === "income" && selectedClass
        )}
        onClick={() => onChange("income")}
      >
        <ArrowDownIcon className="w-4 h-4 rotate-45 text-green-500" />
        Income
      </button>
      <button
        className={cn(
          "px-4 py-2 rounded-3xl flex items-center gap-2",
          value === "expense" && selectedClass
        )}
        onClick={() => onChange("expense")}
      >
        <ArrowUpIcon className="w-4 h-4 rotate-45 text-red-500" />
        Expense
      </button>
    </div>
  );
};

export default Switch;
