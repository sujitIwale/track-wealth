import Modal from "../common/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setTransactionModal } from "../../store/slices/uiSlice";
import IconButton from "../common/IconButton/IconButton";
import { IoClose } from "react-icons/io5";
import Typography from "../common/Typography/Typography";
import Button from "../common/Button/Button";
import { expensesApi } from "../../api/expense";
import { useState } from "react";
import AmountInput from "../AmountInput/AmountInput";
import { STATUS } from "../../types/common";
import { ExpenseBase } from "../../types/expense";
import { toast } from "sonner";
import CategorySelector from "./components/CategorySelector";

const initialExpense: ExpenseBase = {
  amount: 0,
  name: "",
  category: "food",
  comment: "",
};

const AddExpense = () => {
  const [expense, setExpense] = useState<ExpenseBase>(initialExpense);
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);

  const { open } = useAppSelector((store) => store.ui.addTransactionModal);
  const dispatch = useAppDispatch();

  const handleChange = (
    key: keyof ExpenseBase,
    value: ExpenseBase[keyof ExpenseBase]
  ) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    dispatch(setTransactionModal({ open: false }));
    setExpense(initialExpense);
  };

  const handleSave = async () => {
    try {
      setStatus(STATUS.LOADING);
      await expensesApi.createExpense(expense);
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
      isOpen={open}
      onClose={handleClose}
      showCloseButton={false}
      size="full"
    >
      <Modal.Header className="flex items-center gap-2 py-4 px-2">
        <IconButton icon={<IoClose size={24} />} onClick={handleClose} />
        <Typography variant="h5" className="pl-7">
          Add Expense
        </Typography>
        <Button
          variant="text"
          onClick={handleSave}
          loading={status === STATUS.LOADING}
        >
          save
        </Button>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4 p-4">
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
            Category
          </Typography>
          <CategorySelector
            value={expense.category}
            onValueChange={(val) => handleChange("category", val)}
          />
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
      </Modal.Body>
    </Modal>
  );
};

export default AddExpense;
