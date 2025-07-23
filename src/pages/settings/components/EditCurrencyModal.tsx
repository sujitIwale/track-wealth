import ResponsiveModal from "@/components/common/Modal/ResponsiveModal";
import Typography from "@/components/common/Typography/Typography";
import CurrencySelector from "@/components/shared/CurrencySelector";
import { Button } from "@/components/ui/button";
import { Currency } from "@/constants/misc";
import { updateCurrency } from "@/store/thunks/user";
import { STATUS } from "@/types/common";
import { useAppDispatch } from "@/store/store";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type EditCurrencyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
};

const EditCurrencyModal = ({
  isOpen,
  onClose,
  currency,
}: EditCurrencyModalProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency);
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    setStatus(STATUS.LOADING);
    dispatch(updateCurrency(selectedCurrency));
    setStatus(STATUS.SUCCESS);
    onClose();
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      headerContent={
        <Typography variant="h4" className="p-4">
          Edit Currency
        </Typography>
      }
      footerContent={
        <>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={status === STATUS.LOADING}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={status === STATUS.LOADING}
          >
            {status === STATUS.LOADING ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </>
      }
      footerClassName="flex gap-2 justify-end"
    >
      <div className="px-4 py-8">
        <CurrencySelector
          selectedCurrencyCode={selectedCurrency}
          onCurrencySelect={setSelectedCurrency}
          disabled={status === STATUS.LOADING}
        />
      </div>
    </ResponsiveModal>
  );
};

export default EditCurrencyModal;
