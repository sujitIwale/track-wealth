import Selector from "@/components/AddTransaction/components/Selector";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoriesList } from "@/constants/expense";
import { cn } from "@/lib/utils";
import { ImportedTransaction } from "@/types/transaction";
import { format } from "date-fns";
import { CalendarIcon, MinusIcon, TrashIcon } from "lucide-react";
import { zIndex } from "@/constants/styles";
import Checkbox from "@/components/common/Checkbox/Checkbox";

type Column = {
  id: keyof ImportedTransaction;
  name: string;
  type: "date" | "text" | "number" | "select";
};

const columns: Column[] = [
  {
    id: "date",
    name: "Date",
    type: "date",
  },
  {
    id: "name",
    name: "Name",
    type: "text",
  },
  {
    id: "amount",
    name: "Amount",
    type: "number",
  },
  {
    id: "toAccount",
    name: "To Account",
    type: "text",
  },
  {
    id: "category",
    name: "Category",
    type: "select",
  },
];

const getCell = (
  column: Column,
  transaction: ImportedTransaction,
  index: number,
  onEditTransaction: (
    index: number,
    field: keyof ImportedTransaction,
    value: string | number
  ) => void
) => {
  switch (column.type) {
    case "date":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {transaction.date ? (
                format(transaction.date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className={zIndex.select}>
            <Calendar
              mode="single"
              selected={new Date(transaction.date)}
              onSelect={(date) =>
                date && onEditTransaction(index, "date", date.getTime())
              }
              initialFocus
              showOutsideDays={false}
            />
          </PopoverContent>
        </Popover>
      );
    case "text":
      return (
        <Input
          type="text"
          value={transaction[column.id]}
          onChange={(e) => onEditTransaction(index, column.id, e.target.value)}
          className="w-auto"
        />
      );
    case "number":
      return (
        <Input
          type="number"
          value={transaction[column.id]}
          onChange={(e) => onEditTransaction(index, column.id, e.target.value)}
          className="w-auto"
        />
      );
    case "select":
      return (
        <Selector
          value={transaction[column.id] as string}
          list={CategoriesList}
          onValueChange={(value) => onEditTransaction(index, column.id, value)}
        />
      );
    default:
      return <div>{transaction[column.id]}</div>;
  }
};

type TransactionsTableProps = {
  transactions: ImportedTransaction[];
  onEditTransaction: (
    index: number,
    field: keyof ImportedTransaction,
    value: string | number
  ) => void;
  onDeleteTransaction: (index: number, type: "debit" | "credit") => void;
  selectedTransactions: Set<string | number>;
  setSelectedTransactions: (transactions: Set<string | number>) => void;
};

const TransactionsTable = ({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
  selectedTransactions,
  setSelectedTransactions,
}: TransactionsTableProps) => {
  console.log({
    selectedTransactions: Object.values(selectedTransactions).length,
    transactions: transactions.length,
  });

  const isPartiallySelected =
    selectedTransactions.size > 0 &&
    selectedTransactions.size !== transactions.length;
  const isAllSelected =
    selectedTransactions.size === transactions.length &&
    transactions.length > 0;

  return (
    <div className="overflow-auto">
      <table className="w-full relative">
        <thead className="bg-white">
          <tr className="border-b text-left bg-white">
            <th className="p-2 w-5">
              <Checkbox
                icon={
                  isPartiallySelected ? (
                    <MinusIcon className="size-3.5" />
                  ) : null
                }
                checked={isAllSelected || isPartiallySelected}
                onChange={(checked) => {
                  if (checked) {
                    setSelectedTransactions(
                      new Set(transactions.map((transaction) => transaction.id))
                    );
                  } else {
                    setSelectedTransactions(new Set());
                  }
                }}
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.id}
                className={`p-2 text-left font-medium text-slate-600 text-nowrap ${
                  column.id === "date" ? "max-w-[100px]" : ""
                }`}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-left">
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td className="p-2">
                <Checkbox
                  checked={selectedTransactions.has(transaction.id)}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedTransactions(
                        new Set(selectedTransactions).add(transaction.id)
                      );
                    } else {
                      const newSet = new Set(selectedTransactions);
                      newSet.delete(transaction.id);
                      setSelectedTransactions(newSet);
                    }
                  }}
                />
              </td>
              {columns.map((column) => (
                <td key={column.id} className="p-2">
                  {getCell(column, transaction, index, onEditTransaction)}
                </td>
              ))}
              <td className="p-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDeleteTransaction(index, "debit")}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
