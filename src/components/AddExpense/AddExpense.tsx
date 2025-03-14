import Modal from "../common/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setTransactionModal } from "../../store/slices/uiSlice";

const AddExpense = () => {
  const { open } = useAppSelector((store) => store.ui.addTransactionModal);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setTransactionModal({ open: false }));
  };

  return (
    <Modal isOpen={open} onClose={handleClose} showCloseButton={false}>
      <Modal.Header onClose={handleClose} title="Add Expense" />
      <Modal.Body>Something</Modal.Body>
    </Modal>
  );
};

export default AddExpense;
