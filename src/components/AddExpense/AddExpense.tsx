import { STATUS } from "../../types/common";
import { ExpenseBase } from "../../types/expense";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import Spinner from "../common/Spinner/Spinner";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import TransactionProvider from "./context/TransactionProvider";
import { useTransaction } from "./context/TransactionContext";
import ExpenseForm from "./components/ExpenseForm";
import IncomeForm from "./components/IncomeForm";
import Switch from "./components/Switch";

const initialExpense: ExpenseBase = {
  amount: 0,
  name: "",
  category: "food",
  accountType: "cash",
  comment: "",
  date: Date.now(),
};

type ModalContentProps = {
  expenseId?: string | null;
  onClose?: () => void;
};

const ModalContent = ({ onClose }: ModalContentProps) => {
  const { type, setType, setExpense, save, status } = useTransaction();

  const handleClose = () => {
    onClose?.();
    setExpense(initialExpense);
  };

  const handleSave = () => {
    save().then((success) => {
      if (success) {
        handleClose();
      }
    });
  };

  return (
    <DrawerContent className="min-h-screen">
      <DrawerHeader className="flex items-center justify-between py-4 px-2">
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X />
        </Button>
        <DrawerTitle className="pl-7">
          {type === "expense" ? "Add Expense" : "Add Income"}
        </DrawerTitle>
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
      </DrawerHeader>
      <div className="flex flex-col gap-4 p-4 overflow-y-auto">
        <div className="flex justify-center mb-6">
          <Switch value={type} onChange={setType} />
        </div>
        {type === "expense" ? <ExpenseForm /> : <IncomeForm />}
      </div>
    </DrawerContent>
  );
};

type AddTransactionProps = {
  expenseId?: string | null;
  open?: boolean;
  onClose?: () => void;
};

const AddTransaction = ({ expenseId, open, onClose }: AddTransactionProps) => {
  return (
    <TransactionProvider>
      <Drawer open={open ?? false} onOpenChange={onClose}>
        <ModalContent expenseId={expenseId} onClose={onClose} />
      </Drawer>
    </TransactionProvider>
  );
};

export default AddTransaction;
