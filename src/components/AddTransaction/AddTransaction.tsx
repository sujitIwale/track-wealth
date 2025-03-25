import { STATUS } from "../../types/common";
import { ExpenseBase } from "../../types/expense";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import Spinner from "../common/Spinner/Spinner";
import TransactionProvider from "./context/TransactionProvider";
import { useTransaction } from "./context/TransactionContext";
import Switch from "./components/Switch";
import { useParams, useNavigate } from "react-router";
import ExpenseForm from "./components/ExpenseForm";
import IncomeForm from "./components/IncomeForm";
import { incomesApi } from "@/api/transaction";
import { useEffect, useRef } from "react";
import { expensesApi } from "@/api/transaction";
import { useAppSelector } from "@/store/store";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

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
  const { type, id } = useParams();
  const currency = useAppSelector((state) => state.user.currency);
  const { setExpense, setIncome, save, reset, status } = useTransaction();
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "expense" && id) {
      expensesApi.getExpense(id).then((_expense) => {
        if (_expense) {
          setExpense({
            amount: _expense.amount,
            name: _expense.name,
            category: _expense.category,
            accountType: _expense.accountType,
            comment: _expense.comment,
            date: new Date(_expense.createdAt).getTime(),
          });
        }
      });
    } else if (type === "income" && id) {
      incomesApi.getIncome(id).then((_income) => {
        if (_income) {
          setIncome({
            amount: _income.amount,
            name: _income.name,
            source: _income.source,
            accountType: _income.accountType,
            comment: _income.comment,
            date: new Date(_income.createdAt).getTime(),
          });
        }
      });
    }
  }, [id, setExpense, setIncome, type]);

  const handleClose = () => {
    onClose?.();
    setExpense(initialExpense);
  };

  const handleSave = () => {
    save(type as "expense" | "income", id).then((success) => {
      if (success) {
        handleClose();
      }
    });
  };

  const handleTypeChange = (value: "expense" | "income") => {
    navigate(`/transaction/${value}`);
    reset();
  };

  return (
    <>
      <div className="flex items-center justify-between py-4 px-2">
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X />
        </Button>
        <h2 className="pl-7">
          {type === "expense"
            ? `${id ? "Edit" : "Add"} Expense`
            : `${id ? "Edit" : "Add"} Income`}
        </h2>
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
      </div>
      <div className="flex flex-col gap-4 p-4 overflow-y-auto pb-[70px]">
        <div className="flex justify-center mb-6">
          <Switch
            value={type as "expense" | "income"}
            onChange={handleTypeChange}
          />
        </div>
        {type === "expense" ? (
          <ExpenseForm currency={currency} />
        ) : (
          <IncomeForm currency={currency} />
        )}
      </div>
    </>
  );
};

type AddTransactionProps = {
  open?: boolean;
};

const AddTransaction = ({ open }: AddTransactionProps) => {
  const sheetRef = useRef<BottomSheetRef | null>(null);

  const navigate = useNavigate();
  const onClose = () => {
    navigate("/dashboard");
  };

  return (
    <TransactionProvider>
      <BottomSheet
        open={open ?? false}
        ref={sheetRef}
        onDismiss={onClose}
        expandOnContentDrag
      >
        <ModalContent onClose={onClose} />
      </BottomSheet>
    </TransactionProvider>
  );
};

export default AddTransaction;
